import { View } from "@tarojs/components";
import styles from "./index.module.scss";
import SideBar from "../sideBar";
import { useState } from "react";
import { Category, Add } from "@nutui/icons-react-taro";

function Header() {
  const [visible, setVisible] = useState(false);

  const addHandle = () => {
    console.log("addHandle");
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
        <View className={styles.name}>3</View>
        <View className={styles.favorite}>4</View>
      </View>
      <SideBar visible={visible} setVisible={setVisible} />
    </>
  );
}

export default Header;
