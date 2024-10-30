import { View } from "@tarojs/components";
import { Grid, Empty, Input, Sticky, Dialog } from "@nutui/nutui-react-taro";
import { Image } from "@nutui/icons-react-taro";
import { useFavoriteStore, useMainStore } from "@/store";
import { RecordState } from "@/types";
import { createElement, useMemo, useState } from "react";
import Action from "@/components/action";
import Taro from "@tarojs/taro";

function Favorite() {
  const { favoriteList, removeFavorite, setFavoriteName } = useFavoriteStore();
  const { findRecord, addRecord, setCurrent } = useMainStore();

  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState<number>();

  const list = useMemo(() => {
    if (!text) return favoriteList;

    return favoriteList.filter((item) => item.name.includes(text));
  }, [favoriteList, text]);

  const renderGridItem = (list: RecordState[]) => {
    return list.map((item) => {
      return (
        <Grid.Item key={item.id} text={item.name}>
          <Image></Image>
        </Grid.Item>
      );
    });
  };

  const clickHandle = (index: number) => {
    setIndex(index);
    setVisible(true);
  };

  const onselect = (item: any) => {
    switch (item.value) {
      case "rename":
        let name = "";
        Dialog.open("action", {
          title: "重命名",
          content: createElement(Input, {
            defaultValue: list[index!].name,
            focus: true,
            onChange(e) {
              name = e;
            },
          }),
          onConfirm: () => {
            if (name) {
              setFavoriteName(list[index!].id, name);
            }
            Dialog.close("action");
          },
          onCancel: () => {
            Dialog.close("action");
          },
        });
        break;
      case "remove":
        removeFavorite(list[index!].id);
        break;
      case "dialog":
        const record = findRecord(list[index!].id);
        if (!record) {
          addRecord(list[index!])
        }
        setCurrent(list[index!].id)
        Taro.navigateBack()
        break;
    }
  };

  return (
    <View>
      {favoriteList.length ? (
        <View>
          <Sticky threshold={43}>
            <View>
              <Input
                type="text"
                placeholder="请输入搜索内容"
                value={text}
                onChange={(e) => setText(e)}
              />
            </View>
          </Sticky>

          <Grid
            columns={2}
            gap={10}
            reverse
            onClick={(_, index) => clickHandle(index)}
          >
            {renderGridItem(list)}
          </Grid>
        </View>
      ) : (
        <Empty description="暂无收藏" />
      )}

      <Dialog id="action" />
      <Action
        visible={visible}
        isFavorite={true}
        setVisible={setVisible}
        onSelect={onselect}
      />
    </View>
  );
}

export default Favorite;
