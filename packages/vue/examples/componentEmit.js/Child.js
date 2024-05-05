import { h, ref, reactive } from '../../lib/guide-vue.esm.js'
export default {
  name: 'Child',
  setup(props, { emit }) {
    // emit('change', 'aaaaa', 'bbbbbb')
    // // 支持多个 -
    // emit('change-page-name', 'start', 'game')

    const emitAdd = () => {
      console.log('emitAdd')
      emit('add', 1, 2)

      emit('add-foo', 1, 2)
    }

    return {
      emitAdd,
    }
  },
  render() {
    const btn = h(
      'button',
      {
        onClick: this.emitAdd,
      },
      'emitAdd'
    )

    const foo = h('p', {}, 'foo')
    return h('div', {}, [foo, btn])
  },
}
