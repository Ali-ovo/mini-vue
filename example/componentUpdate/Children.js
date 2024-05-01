import { h, ref } from '../../lib/guide-vue.esm.js'

export default {
  name: 'Children',
  setup() {
    const props = ref({
      foo: 'foo',
      bar: 'bar',
    })

    const onChangePropsDemo1 = () => {
      props.value.foo = 'new Foo'
    }

    const onChangePropsDemo2 = () => {
      props.value.foo = undefined
    }

    const onChangePropsDemo3 = () => {
      props.value = {
        foo: 'foo',
      }
    }

    return {
      props,
      onChangePropsDemo1,
      onChangePropsDemo2,
      onChangePropsDemo3,
    }
  },

  render() {
    return h(
      'div',
      {
        ...this.props,
      },
      [
        h(
          'button',
          {
            onClick: this.onChangePropsDemo1,
          },
          'changeProps - 改变值 -修改'
        ),
        h(
          'button',
          {
            onClick: this.onChangePropsDemo2,
          },
          'changeProps - 改变值 undefined -删除'
        ),
        h(
          'button',
          {
            onClick: this.onChangePropsDemo3,
          },
          'changeProps - key没有 -删除'
        ),
      ]
    )
  },
}
