import { ref } from '../../dist/mini-vue.esm-bundler.js'

// 最简单的情况
// template 只有一个 interpolation
export default {
  template: `{{msg}}`,
  setup() {
    return {
      msg: "vue3 - compiler",
    };
  },
};

// 复杂一点
// template 包含 element 和 interpolation
// export default {
//   template: `<div>{{msg}}  {{count}}</div>`,
//   setup() {
//     const count = ref(0)
//     window.count = count
//     return {
//       msg: 'vue3 - compiler',
//       count,
//     }
//   },
// }
