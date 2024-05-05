import { createVNode } from './vnode'

export function createAppApi(render) {
  return function createApp(rootComponent) {
    return {
      mount(rootContainer) {
        //  vnode
        const vnode = createVNode(rootComponent)

        // render
        render(vnode, rootContainer)
      },
    }
  }
}
