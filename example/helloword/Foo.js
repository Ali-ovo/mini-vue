import { h } from '../../lib/guide-vue.esm.js'

export const Foo = {
  name: 'Foo',
  setup(props) {
    // get props
    console.log('Foo setup', props)

    // readonly
    props.count++
  },
  render() {
    return h('div', {}, 'foo:' + this.count)
  },
}
