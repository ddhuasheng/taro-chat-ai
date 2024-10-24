import { Input, Button } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";
import { useState } from "react";
import styles from "./index.module.scss"

function TextInput() {
  const [value, setValue] = useState<string>("");

  const send = () => {
    if (!value.trim()) return;

    console.log(value)
  }

  return (
    <View className={styles.textInput}>
      <Input
        value={value}
        placeholder="请输入您想发送的消息"
        onChange={(e) => setValue(e)}
      />
      <Button className={styles.send} type="primary" onClick={() => send()}>发送</Button>
    </View>
  );
}

export default TextInput;
