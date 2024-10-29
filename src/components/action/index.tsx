import { ActionSheet  } from "@nutui/nutui-react-taro";
import { useConfig } from './useConfig'

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function Action({ visible, setVisible }: Props) {

  const { list } = useConfig()

  const handleSelect = (item: { handler: () => void, value: string, label: string }) => {
    setVisible(false)
    item.handler()
  }

  return (
    <ActionSheet
      visible={visible}
      options={list}
      onSelect={handleSelect}
      onCancel={() => setVisible(false)}
      position="bottom"
    >
    </ActionSheet>
  );
}

export default Action;
