import { View } from "@tarojs/components"
import Header from '../header'
import TextInput from "../textInput"
import styles from './index.module.scss'

function Container() {
  return <View>
    <Header />
    <View className={styles.container}>
      111111111
    </View>
    <TextInput />
  </View>
}


export default Container
