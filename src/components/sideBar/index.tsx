import {
  SideNavBar,
  SubSideNavBar,
  SideNavBarItem,
} from "@nutui/nutui-react-taro";
import { sideConfig, type SideConfig, type sideConfigChildren } from "./config";
import Taro from "@tarojs/taro";
import { useMainStore } from "@/store";
import { useMemo } from "react";

interface SideBarProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const SideBar = ({ visible, setVisible }: SideBarProps) => {
  const { setCurrent, records } = useMainStore();

  const config = useMemo(() => {
    const side = [...sideConfig];
    side[0].children = records.map((item) => {
      return {
        ...item,
        value: String(item.id),
        title: item.name,
      };
    });

    return side;
  }, [records]);

  const clickHandle = (
    item: SideConfig | sideConfigChildren,
  ) => {
    setVisible(false);

    if (item.path) {
      setCurrent(null);
      Taro.navigateTo({
        url: item.path,
      });
    } else {
      const pages = Taro.getCurrentPages();
      const currentPage = pages[pages.length - 1];

      if ((item as sideConfigChildren).id) {
        setCurrent(Number(item.value));
      }

      if (currentPage.route !== "pages/index/index") {
        Taro.navigateBack();
      }
    }
  };

  const renderSideConfig = (config: typeof sideConfig) => {
    return config.map((item) => {
      return item.children?.length ? (
        <SubSideNavBar
          title={item.title}
          value={item.value}
          children={renderSideConfig(item.children)}
        />
      ) : (
        <SideNavBarItem
          title={item.title}
          value={item.value}
          onClick={() => clickHandle(item)}
        />
      );
    });
  };

  return (
    <>
      <SideNavBar
        title="更多内容"
        visible={visible}
        position={"left"}
        onClose={() => {
          setVisible(false);
        }}
      >
        {renderSideConfig(config)}
      </SideNavBar>
    </>
  );
};
export default SideBar;
