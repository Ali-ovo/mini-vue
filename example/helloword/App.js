import { h } from '../../lib/guide-vue.esm.js'

export const App = {
  render() {
    return h('div', { id: 'hi',  },
      [
        h(
          'span', 
          {
            class: ['red']
          }, 
          'Hello'
        ),
        h('span', null, this.msg)
      ]
    )
  },

  setup() {
    return {
      msg: ' world!',
    }
  },
}
