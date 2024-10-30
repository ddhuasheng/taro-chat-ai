import { View } from "@tarojs/components";
import styles from "./index.module.scss";
import SideBar from "../sideBar";
import { useState } from "react";
import { Category, Add, FollowAdd, Follow } from "@nutui/icons-react-taro";
import { Toast, Ellipsis, Dialog } from "@nutui/nutui-react-taro";
import { useMainStore, useFavoriteStore } from "@/store";
import Action from "../action";
import { useContainer } from "@/hooks";

function Header() {
  const { isFavorite, currentRecord } = useContainer();

  const { setCurrent } = useMainStore();
  const [_, setState] = useState(0);
  const { addFavorite, removeFavorite } = useFavoriteStore();
  const [visible, setVisible] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);

  const addHandle = () => {
    setCurrent(null);
  };

  const followHandle = (isFollow: boolean) => {
    if (!currentRecord.name) return

    if (isFollow) {
      addFavorite(currentRecord);
      Toast.show("favorite", {
        type: "success",
        content: "收藏成功",
        duration: 1,
        position: "center",
      });
    } else {
      removeFavorite(currentRecord.id);
      Toast.show("favorite", {
        type: "success",
        content: "取消收藏成功",
        duration: 1,
        position: "center",
      });
    }

    setState(new Date().getTime());
  };

  const clickHandle = () => {
    !!currentRecord.name && setActionVisible(true);
  };

  return (
    <>
      <View className={styles.header}>
        <View className={styles.title} onClick={() => setVisible(true)}>
          <Category color="#ccc" />
        </View>
        <View className={styles.newChat}>
          <View className={styles.add} onClick={() => addHandle()}>
            <Add color="#1890ff" size={12} />
            新对话
          </View>
        </View>
        <View className={styles.name} onClick={() => clickHandle()}>
          <Ellipsis
            style={{ width: "100%" }}
            content={currentRecord.name}
            direction="end"
          />
        </View>
        <View className={styles.favorite}>
          {isFavorite ? (
            <Follow color="red" size={20} onClick={() => followHandle(false)} />
          ) : (
            <FollowAdd
              color="#ccc"
              size={20}
              onClick={() => followHandle(true)}
            />
          )}
        </View>
      </View>
      <Dialog id="action" />
      <SideBar visible={visible} setVisible={setVisible} />
      <Action visible={actionVisible} setVisible={setActionVisible} />
      <Toast id="favorite" />
    </>
  );
}

export default Header;
