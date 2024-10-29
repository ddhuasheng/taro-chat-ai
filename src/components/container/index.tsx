import { View, Text, ScrollView } from "@tarojs/components";
import Header from "../header";
import TextInput from "../textInput";
import styles from "./index.module.scss";
import { useContainer } from "@/hooks";
import { RecordHistory } from "@/types";
import { RoleEnum } from "@/enums";
import MarkDown from "../markdown";

function Container() {
  const { currentRecord } = useContainer();

  const itemRender = (data: RecordHistory) => {
    const isUser = data.role === RoleEnum.ROLE_USER;

    return (
      <View
        style={{
          display: "flex",
          justifyContent: isUser ? "flex-end" : "flex-start",
        }}
      >
        {isUser ? (
          <Text userSelect className={styles.userText}>
            {data.content}
          </Text>
        ) : (
          <View style={{ marginBottom: "12px" }}>
            <MarkDown children={data.content} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <Header />
      <ScrollView scrollY className={styles.container}>
        {currentRecord.history
          .filter((item) => !item.isFile)
          .map((item) => {
            return itemRender(item);
          })}
      </ScrollView>
      <TextInput />
    </View>
  );
}

export default Container;
