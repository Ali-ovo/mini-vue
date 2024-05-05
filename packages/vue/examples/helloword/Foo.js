import { h } from '../../dist/mini-vue.esm-bundler.js'

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
