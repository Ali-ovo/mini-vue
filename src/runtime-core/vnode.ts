import { isObject } from '../shared'
import { ShapeFlags } from '../shared/ShapeFlags'
// 用 symbol 作为唯一标识
export const Text = Symbol('Text')
export const Fragment = Symbol('Fragment')

export function createVNode(type, props?, children?) {
  const vnode = {
    type,
    key: props && props.key,
    props: props || {},
    children,
    el: null,
    shapeFlag: getShapeflag(type),
  }

  if (typeof children === 'string') {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  }

  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    if (isObject(children)) {
      vnode.shapeFlag |= ShapeFlags.SLOTS_CHILDREN
    }
  }

  return vnode
}

function getShapeflag(type) {
  return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}

export function createTextVNode(text: string) {
  return createVNode(Text, {}, text)
}
