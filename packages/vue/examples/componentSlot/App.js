import { h, ref, createTextVNode } from '../../lib/guide-vue.esm.js'
import Child from './Child.js'

export default {
  name: 'App',
  setup() {},

  render() {
    // const child = h(Child, {}, h('p', {}, '123'))
    // const child = h(Child, {}, [h('p', {}, '123'), h('p', {}, '456')])

    // 具名插槽
    const child = h(
      Child,
      {},
      {
        header: () => [h('p', {}, 'header'), createTextVNode('你好')],
        footer: ({ age }) => h('p', {}, `footer: 我可以接收到 age: ${age}`),
      }
    )

    return h('div', {}, [child])
  },
}
