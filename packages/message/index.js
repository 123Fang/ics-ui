import { createVNode, render } from 'vue'
import fMessage from './index.vue'

export default ({ text, type, timeout, icon, textColor, bgColor, customClass }) => {
  // 动态创建一个DOM容器
  const div =
    typeof document !== 'undefined'
      ? typeof document.createElement !== 'undefined'
        ? document.createElement('div')
        : ''
      : ''
  div.setAttribute('class', 'fx-meassage-container')
  if (typeof document !== 'undefined') {
    document.body.appendChild(div)
  }
  let timer = null
  // 传递给组件的选项
  const vnode = createVNode(fMessage, { text, type, timeout, icon, textColor, bgColor, customClass }, [text])
  render(vnode, div) // 实例化组件并挂在dom上
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div) // 卸载这个组件
    if (typeof document !== 'undefined') {
      document.body.removeChild(div) // 把这个dom移除
    }
    clearTimeout(timer)
  }, timeout || 2500)
}
