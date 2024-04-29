import { h, getCurrentInstance } from '../../lib/guide-vue.esm.js'

export default {
  name: 'Foo',
  setup(props, context) {
    const instance = getCurrentInstance()

    console.log('Foo:', instance)
  },
  render() {
    return h('div', {}, 'foo')
  },
}
