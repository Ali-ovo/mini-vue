import { h } from '../../lib/guide-vue.esm.js'

window.self = null
export const App = {
  render() {
    window.self = this
    return h(
      'div',
      {
        id: 'hi',
        onClick: () => {
          console.log('click')
        },
        onMouseDown: () => {
          console.log('onMouseDown')
        },
      },
      [
        h(
          'span',
          {
            class: ['red'],
          },
          'Hello'
        ),
        h('span', null, this.msg),
      ]
    )
  },

  setup() {
    return {
      msg: ' world! 111 ',
    }
  },
}
