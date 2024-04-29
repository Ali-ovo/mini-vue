import { isObject } from '../shared'
import { ShapeFlags } from '../shared/ShapeFlags'
import { createComponentInstance, setupComponent } from './component'
import { Fragment, Text } from './vnode'

export function render(vnode, container) {
  // patch
  patch(vnode, container, null)
}

function patch(vnode, container, parentComponent) {
  const { shapeFlag, type } = vnode

  // Fragment
  switch (type) {
    case Fragment:
      processFragment(vnode, container, parentComponent)
      break

    case Text:
      processText(vnode, container)
      break

    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container, parentComponent)
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container, parentComponent)
      }

      break
  }
}

function processElement(vnode, container, parentComponent) {
  mountElement(vnode, container, parentComponent)
}

function processFragment(vnode, container, parentComponent) {
  mountChildren(vnode, container, parentComponent)
}

function processText(vnode, container) {
  const { children } = vnode
  const textNode = (vnode.el = document.createTextNode(children))
  container.append(textNode)
}

function processComponent(vnode, container, parentComponent) {
  mountComponent(vnode, container, parentComponent)
}

function mountElement(vnode, container, parentComponent) {
  const { type, props, children, shapeFlag } = vnode

  const el = (vnode.el = document.createElement(type))

  if (props) {
    const isOn = (key: string) => /^on[A-Z]/.test(key)

    for (const key in props) {
      const val = props[key]

      if (isOn(key)) {
        el.addEventListener(key.slice(2).toLowerCase(), val)
      }
      el.setAttribute(key, val)
    }
  }

  if (children) {
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode, el, parentComponent)
    }
  }

  container.append(el)
}

function mountChildren(vnode, container, parentComponent) {
  vnode.children.forEach((v) => {
    patch(v, container, parentComponent)
  })
}

function mountComponent(initialVNode, container, parentComponent) {
  // 创建组件实例
  const instance = createComponentInstance(initialVNode, parentComponent)

  // 调用setup
  setupComponent(instance)

  // 调用render
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy)

  // vnode -> patch
  patch(subTree, container, instance)

  initialVNode.el = subTree.el
}
