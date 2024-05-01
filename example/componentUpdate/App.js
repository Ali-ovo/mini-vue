import { h, ref } from '../../lib/guide-vue.esm.js'

import Children from './Children.js'

export default {
  name: 'App',
  setup() {
    const count = ref(0)

    const onClick = () => {
      count.value++
    }

    return {
      count,
      onClick,
    }
  },

  render() {
    return h(
      'div',
      {
        class: 'root',
      },
      [
        h('div', {}, 'count: ' + this.count),
        h(
          'button',
          {
            onClick: this.onClick,
          },
          'click'
        ),
        h(Children),
      ]
    )
  },
}
