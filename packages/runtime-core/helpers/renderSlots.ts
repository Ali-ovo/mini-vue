import { Fragment, createVNode } from '../src/vnode'

export function renderSlot(slots, name, props) {
  const slot = slots[name]

  if (slot) {
    if (typeof slot === 'function') {
      return createVNode(Fragment, {}, slot(props))
    }
  }
}
