import { Dialog, Input, Toast } from "@nutui/nutui-react-taro";
import { useContainer } from "@/hooks";
import { useMainStore, useFavoriteStore } from "@/store";
import { createElement } from "react";

export const useConfig = (isFavoriteAction?:boolean) => {
  const { currentRecord, isFavorite } = useContainer();
  const { addFavorite, removeFavorite } = useFavoriteStore();
  const { setRecordName, removeRecord } = useMainStore();

  const renameHandler = () => {
    let name = ''
    Dialog.open("action", {
      title: "重命名",
      content: createElement(Input, {
        defaultValue: currentRecord.name,
        focus: true,
        onChange(e) {
          name = e
        }
      }),
      onConfirm: () => {
        if (name) {
          setRecordName(name);
        }
        Dialog.close("action");
      },
      onCancel: () => {
        Dialog.close("action");
      },
    });
  };

  const favoriteHandler = () => {
    if (isFavorite) {
      removeFavorite(currentRecord?.id);
      Toast.show("favorite", {
        type: "success",
        content: "取消收藏成功",
        duration: 1,
        position: "center",
      });
    } else {
      addFavorite(currentRecord);
      Toast.show("favorite", {
        type: "success",
        content: "收藏成功",
        duration: 1,
        position: "center",
      });
    }
  };

  const removeHandler = () => {
    Dialog.open("action", {
      title: "提示",
      content: `确定删除对话'${currentRecord.name}'吗？`,
      onConfirm: () => {
        removeRecord(currentRecord.id)
        Dialog.close("action");
      },
      onCancel: () => {
        Dialog.close("action");
      },
    });
  };

  const list = [
    isFavoriteAction ? {
      name: "对话",
      value: 'dialog',
      handler: () => {}
    } : null,
    {
      name: "重命名",
      value: "rename",
      handler: renameHandler,
    },
    isFavoriteAction ? null : {
      name: isFavorite ? "取消收藏" : "收藏",
      value: "favorite",
      handler: favoriteHandler,
    },
    {
      name: "删除",
      value: "remove",
      handler: removeHandler,
    },
  ].filter(item => item);

  return {
    list,
  };
};
