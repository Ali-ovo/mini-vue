import { h, ref, reactive, getCurrentInstance, nextTick } from '../../lib/guide-vue.esm.js'
import NextTicker from './NextTicker.js'

export default {
  name: 'App',
  setup() {
    const count = ref(1)
    const instance = getCurrentInstance()

    function onClick() {
      for (let i = 0; i < 100; i++) {
        console.log('update')
        count.value = i
      }

      console.log('%c [ instance ]-9', 'font-size:13px; background:#1cfb33; color:#60ff77;', instance)

      nextTick(() => {
        console.log('nextTick instance', instance)
      })
    }

    return {
      count,
      onClick,
    }
  },

  render() {
    const button = h(
      'button',
      {
        onClick: this.onClick,
      },
      'update'
    )

    const p = h('p', {}, `count: ${this.count}`)

    return h('div', null, [button, p])
    // return h('div', { tId: 1 }, [h('p', {}, '主页'), h(NextTicker)])
  },
}
