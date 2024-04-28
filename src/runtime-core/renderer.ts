import { isObject } from '../shared'
import { ShapeFlags } from '../shared/ShapeFlags'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // patch

  patch(vnode, container)
}

function patch(vnode, container) {
  const { shapeFlag } = vnode

  if (shapeFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container)
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    processComponent(vnode, container)
  }
}

function processElement(vnode, container) {
  mountElement(vnode, container)
}

function mountElement(vnode, container) {
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
      mountChildren(vnode, el)
    }
  }

  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container)
  })
}

function processComponent(vnode, container) {
  mountComponent(vnode, container)
}

function mountComponent(initialVNode, container) {
  // 创建组件实例
  const instance = createComponentInstance(initialVNode)

  // 调用setup
  setupComponent(instance)

  // 调用render
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy)

  // vnode -> patch
  patch(subTree, container)

  initialVNode.el = subTree.el
}
