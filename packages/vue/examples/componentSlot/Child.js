import { h, ref, reactive, renderSlot } from '../../lib/guide-vue.esm.js'
export default {
  name: 'Child',
  setup(props, context) {},
  render() {
    const child = h('div', {}, 'child')

    return h('div', {}, [
      renderSlot(this.$slots, 'header'),

      child,
    
      renderSlot(this.$slots, 'footer', {
        age: 16,
      }),
    ])
  },
}
