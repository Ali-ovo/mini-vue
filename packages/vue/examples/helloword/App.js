import { h, ref } from '../../dist/mini-vue.esm-bundler.js'
import { Foo } from './Foo.js'

window.self = null
export const App = {
  name: 'App',
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
        // h(
        //   'span',
        //   {
        //     class: ['red'],
        //   },
        //   'Hello'
        // ),
        // h('span', null, this.msg),
        h('div', {}, 'hi, ' + this.msg),
        h(Foo, { count: 1 }),
      ]
    )
  },

  setup() {
    return {
      msg: ' world!',
    }
  },
}
