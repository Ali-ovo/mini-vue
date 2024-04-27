import { render } from './renderer'
import { createVNode } from './vnode'

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      //  vnode
      const vnode = createVNode(rootComponent)

      // render
      render(vnode, rootContainer)
    },
  }
}
