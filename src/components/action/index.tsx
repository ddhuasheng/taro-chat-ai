import { ActionSheet } from "@nutui/nutui-react-taro";
import { useConfig } from "./useConfig";

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSelect?: (item: any) => void;
  isFavorite?: boolean;
}

function Action({ visible, setVisible, onSelect, isFavorite }: Props) {
  const { list } = useConfig(isFavorite);

  const handleSelect = (item: {
    handler: () => void;
    value: string;
    label: string;
  }) => {
    setVisible(false);
    if (onSelect) {
      onSelect?.(item);
    } else {
      item.handler?.();
    }
  };

  return (
    <ActionSheet
      visible={visible}
      options={list}
      onSelect={handleSelect}
      onCancel={() => setVisible(false)}
      position="bottom"
    ></ActionSheet>
  );
}

export default Action;
