// 组件 provide 和 inject 功能
import { h, provide, inject } from '../../lib/guide-vue.esm.js'

const ProviderOne = {
  setup() {
    provide('foo', 'foo')
    provide('bar', 'bar')
  },

  render() {
    return h('div', {}, [h('p', {}, 'Provide'), h(ProviderTwo)])
  },
}

const ProviderTwo = {
  setup() {
    // override parent value
    provide('foo', 'fooOverride')
    const foo = inject('foo')

    // 这里获取的 foo 的值应该是 "foo"
    // 这个组件的子组件获取的 foo ，才应该是 fooOverride
    return {
      foo,
    }
  },
  render() {
    return h('div', {}, [
      h('p', {}, `ProviderTwo foo: ${this.foo}`),
      h(Consumer),
    ])
  },
}

const Consumer = {
  setup() {
    const foo = inject('foo')
    const bar = inject('bar')
    const baz = inject('baz', 'defaultBaz')
    // return () => {
    //   return h('div', {}, `${foo}-${bar}-${baz}`)
    // }

    return {
      foo,
      bar,
      baz,
    }
  },
  render() {
    return h('div', {}, `Consumer: ${this.foo}-${this.bar}-${this.baz}`)
  },
}

export default {
  name: 'App',
  setup() {
    return () => h('div', {}, [h('p', {}, 'apiInject'), h(ProviderOne)])
  },
}
