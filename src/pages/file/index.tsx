import { View, Text } from "@tarojs/components";
import styles from "./index.module.scss";
import { Collapse, Input, Loading, Row, Col, Checkbox } from "@nutui/nutui-react-taro";
import { useEffect, useMemo, useState } from "react";
import { fileServices } from "@/apis";
import { ArrowDown } from "@nutui/icons-react-taro";
import { FileListVO } from "@/types";
import dayjs from "dayjs";

function File() {
  const [data, setData] = useState<FileListVO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const list = useMemo(() => {
    if (!searchText) return data;

    return data.filter((item) => {
      return item.name.includes(searchText);
    });
  }, [data, searchText]);

  useEffect(() => {
    setLoading(true);
    fileServices
      .getFileList()
      .then((res) => {
        setData(res.data.files);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onchange = (e: boolean, item: FileListVO) => {
    if(e) {
      setCheckedList([...checkedList, item.id]);
    } else {
      setCheckedList(checkedList.filter(id => id !== item.id));
    }
  }

  const titleRender = (item: FileListVO) => {
    return <>
      <Checkbox checked={checkedList.includes(item.id)} onChange={(e) => onchange(e, item)} ></Checkbox>
      <Text>{item.name}</Text>
    </>
  }

  return (
    <View className={styles.fileContainer}>
      <Input
        className={styles.input}
        value={searchText}
        onChange={(e) => setSearchText(e)}
        placeholder="请输入文件名"
        clearable={true}
      />
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <Collapse accordion  expandIcon={<ArrowDown />}>
          {list.map((item) => {
            return (
              <Collapse.Item title={titleRender(item)} key={item.id} name={item.id}>
                {
                  <Row>
                    <Col span={24}>
                      <Text>文件id: </Text>
                      <Text>{item.id}</Text>
                    </Col>
                    <Col span={24}>
                      <Text>文件大小: </Text>
                      <Text>{(item.size / 1024).toFixed(2) + "KB"}</Text>
                    </Col>
                    <Col span={24}>
                      <Text>创建时间:</Text>
                      <Text>
                        {dayjs(
                          Number(String(item.createTime).padEnd(13, "0"))
                        ).format("YYYY-MM-DD HH:mm:ss")}
                      </Text>
                    </Col>
                  </Row>
                }
              </Collapse.Item>
            );
          })}
        </Collapse>
      )}
    </View>
  );
}

export default File;
