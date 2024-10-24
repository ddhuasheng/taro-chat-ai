import {
  SideNavBar,
  SubSideNavBar,
  SideNavBarItem,
} from "@nutui/nutui-react-taro";
import { sideConfig, type SideConfig } from "./config";
import Taro from "@tarojs/taro";

interface SideBarProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const SideBar = ({ visible, setVisible }: SideBarProps) => {
  const clickHandle = (item: SideConfig) => {
    setVisible(false);

    if (item.path) {
      Taro.navigateTo({
        url: item.path,
      });
    } else {
      const pages = Taro.getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage.route !== "pages/index/index") {
        Taro.navigateBack();
      }
    }
  };

  const renderSideConfig = (config: typeof sideConfig) => {
    return config.map((item) => {
      return item.children?.length ? (
        <SubSideNavBar title={item.title} value={item.value}>
          {renderSideConfig(item.children)}
        </SubSideNavBar>
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
        {renderSideConfig(sideConfig)}
      </SideNavBar>
    </>
  );
};
export default SideBar;
