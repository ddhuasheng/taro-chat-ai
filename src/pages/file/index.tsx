import { View, Text } from "@tarojs/components";
import styles from "./index.module.scss";
import {
  Collapse,
  Input,
  Loading,
  Row,
  Col,
  Checkbox,
  Button,
  Space,
  Dialog,
  Uploader
} from "@nutui/nutui-react-taro";
import { useEffect, useMemo, useState } from "react";
import { fileServices } from "@/apis";
import { ArrowDown } from "@nutui/icons-react-taro";
import { FileListVO } from "@/types";
import { useMainStore, useOtherStore } from "@/store";
import dayjs from "dayjs";
import { Message } from "@/utils";
import { RoleEnum } from "@/enums";
import Taro from "@tarojs/taro";

function File() {
  const [data, setData] = useState<FileListVO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const { addRecord, setCurrent } = useMainStore();
  const { setFiles } = useOtherStore();

  const list = useMemo(() => {
    if (!searchText) return data;

    return data.filter((item) => {
      return item.name.includes(searchText);
    });
  }, [data, searchText]);

  useEffect(() => {
    getFileList();
  }, []);

  const getFileList = () => {
    setLoading(true);
    fileServices
      .getFileList()
      .then((res) => {
        setData(res.data.files);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onchange = (e: boolean, item: FileListVO) => {
    if (e) {
      setCheckedList([...checkedList, item.id]);
    } else {
      setCheckedList(checkedList.filter((id) => id !== item.id));
    }
  };

  const titleRender = (item: FileListVO) => {
    return (
      <>
        <Checkbox
          checked={checkedList.includes(item.id)}
          onChange={(e) => onchange(e, item)}
        ></Checkbox>
        <Text>{item.name}</Text>
      </>
    );
  };

  const removeHandle = (item: FileListVO) => {
    Dialog.open("removeFile", {
      title: "提示",
      content: `确定删除文件 '${item.name}' 吗?`,
      onConfirm: () => {
        fileServices.deleteFile(item.id).then(() => {
          getFileList();
        });
        Dialog.close("removeFile");
      },
      onCancel: () => {
        Dialog.close("removeFile");
      },
    });
  };

  const chatHandle = (items: FileListVO[]) => {
    setFiles(items.map(item => ({
      fileId: item.id,
      fileName: item.name,
    })));

    const id = Date.now();
    addRecord({
      id,
      name: "新对话-" + id,
      isFile: true,
      history: [Message[RoleEnum.ROLE_SYSTEM]()],
    });
    setCurrent(id);

    Taro.navigateBack();
  };

  const mulChatHandle = () => {
    if (!checkedList.length) return

    const items = data.filter(item => checkedList.includes(item.id))
    chatHandle(items)
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
      <Space justify="end">
        <Uploader url={"http://192.168.1.2:5000/api/v1/file/upload"} multiple name="file" onSuccess={getFileList}>
          <Button>上传文件</Button>
        </Uploader>
        <Button type="primary" onClick={() => mulChatHandle()}>多文件对话</Button>
      </Space>
      {loading ? (
        <Loading type="spinner" />
      ) : (
        <Collapse accordion expandIcon={<ArrowDown />}>
          {list.map((item) => {
            return (
              <Collapse.Item
                title={titleRender(item)}
                key={item.id}
                name={item.id}
              >
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
                    <Col span={24}>
                      <Space justify="end">
                        <Button onClick={() => removeHandle(item)}>删除</Button>
                        <Button type="primary" onClick={() => chatHandle([item])}>
                          对话
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                }
              </Collapse.Item>
            );
          })}
        </Collapse>
      )}

      <Dialog id="removeFile" />
    </View>
  );
}

export default File;
