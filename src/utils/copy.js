import useClipboard from 'vue-clipboard3'
import { message } from 'ant-design-vue'

export default () => {
  // 复制功能
  const { toClipboard } = useClipboard()
  const copy = async (text, msg = '复制成功') => {
    try {
      await toClipboard(text)
      if (msg) message.success(msg,10)
    } catch (e) {
      message.error(e)
    }
  }

  return { copy }
}
