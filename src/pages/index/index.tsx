import { useState } from "react";
import { View } from "@tarojs/components";
import { ConfigProvider } from "@nutui/nutui-react-taro";
import zhCN from "@nutui/nutui-react-taro/dist/locales/zh-CN";
import Container from "@/components/container";

function Index() {
  const [locale] = useState(zhCN);

  return (
    <ConfigProvider locale={locale}>
      <View className="nutui-react-demo">
        <Container />
      </View>
    </ConfigProvider>
  );
}

export default Index;
