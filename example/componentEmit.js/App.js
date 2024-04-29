// 组件 emit 逻辑 demo
// click emit 发出 change， 可以触发 App 组件内定义好的侦听函数
// 允许接收多个参数
import { h, ref, reactive } from '../../lib/guide-vue.esm.js'
import Child from './Child.js'

export default {
  name: 'App',
  setup() {},

  render() {
    return h('div', {}, [
      h('div', {}, '你好'),
      h(Child, {
        msg: 'your name is child',
        onChange(a, b) {
          console.log('---------------change------------------')
          console.log(a, b)
        },
        onChangePageName(a, b) {
          console.log('---------------change-page-name------------------')
          console.log(a, b)
        },
        onAdd(props) {
          console.log('%c [ props ]-25', 'font-size:13px; background:#1508cd; color:#594cff;', props)
          console.log('---------------add------------------')
        },
        onAddFoo(props) {
          console.log('---------------add-foo------------------')
          console.log(props)
        }
      }),
    ])
  },
}
