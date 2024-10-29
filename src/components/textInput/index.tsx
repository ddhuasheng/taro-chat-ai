import { useState } from "react";
import { chatServices } from '@/apis'
import { Message } from "@/utils";
import { RoleEnum } from '@/enums'
import { useContainer } from "@/hooks";
import styles from "./index.module.scss"
import { Input, Button } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";
import { useMainStore, useOtherStore } from '@/store'

function TextInput() {
  const [value, setValue] = useState<string>("");
  const { setCurrent, current, addRecord, addHistory, setChangeNum, changeNum } = useMainStore()
  const { files } = useOtherStore()
  const { currentRecord } = useContainer()

  const send = () => {
    if (!value.trim()) return;

    const userMessage = Message[RoleEnum.ROLE_USER](value)
    // const history = [...currentRecord.history, userMessage]
    if (current === null) {
      addRecord({
        ...currentRecord,
        name: `新对话-${currentRecord.id}`,
        isFile: false,
        history: [...currentRecord.history,userMessage]
      })

      setCurrent(currentRecord.id)
    } else {
      addHistory(userMessage)
    }
    setChangeNum(changeNum + 1)

    setValue("")
    chatServices.chat({
      id: currentRecord.id,
      history: [...currentRecord.history,userMessage],
    }).then(res => {
      console.log(res, 'chat')

      addHistory(Message[RoleEnum.ROLE_ASSISTANT](res.data.content))
      setChangeNum(changeNum + 1)
    })
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
