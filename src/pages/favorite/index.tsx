import { View } from "@tarojs/components";
import { Grid, Empty, Input } from "@nutui/nutui-react-taro";
import { useFavoriteStore } from "@/store";
import { RecordState } from "@/types";
import { useMemo, useState } from "react";

function Favorite() {
  const { favoriteList } = useFavoriteStore();

  const [text, setText] = useState('')

  const list = useMemo(() => {
    return favoriteList.filter((item) => item.name.includes(text))
  }, [favoriteList, text])

  const renderGridItem = (list: RecordState[]) => {
    return list.map(item => {
      return <Grid.Item key={item.id} text={item.name}></Grid.Item>
    })
  }

  return (
    <View>
      {favoriteList.length ? (
        <View>
          <View>
            <Input
              type="text"
              placeholder="请输入搜索内容"
              value={text}
              onChange={(e) => setText(e)}
            />
          </View>
          <Grid>
            {renderGridItem(list)}
          </Grid>
        </View>
      ) : (
        <Empty description="暂无收藏" />
      )}
    </View>
  );
}

export default Favorite;
