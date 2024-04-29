// 可以在 setup 中使用 getCurrentInstance 获取组件实例对象
import { h, getCurrentInstance } from '../../lib/guide-vue.esm.js'
import Foo from './Foo.js'

export default {
  name: 'App',
  setup() {
    const instance = getCurrentInstance()
    console.log('App:', instance)
  },

  render() {
    return h('div', {}, [h('p', {}, 'getCurrentInstance'), h(Foo)])
  },
}
