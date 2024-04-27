import { isObject } from '../shared'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // patch

  patch(vnode, container)
}

function patch(vnode, container) {
  // 处理vnode

  // 判断是不是 element
  if (typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container)
  }
}

function processElement(vnode, container) {
  mountElement(vnode, container)
}

function mountElement(vnode, container) {
  const { type, props, children } = vnode

  const el = (vnode.el = document.createElement(type))

  if (props) {
    for (const key in props) {
      const val = props[key]
      el.setAttribute(key, val)
    }
  }

  if (children) {
    if (typeof children === 'string') {
      el.textContent = children
    } else if (Array.isArray(children)) {
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

function mountComponent(vnode, container) {
  // 创建组件实例
  const instance = createComponentInstance(vnode)

  // 调用setup
  setupComponent(instance)

  // 调用render
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance, container) {
  const subTree = instance.render()

  // vnode -> patch
  patch(subTree, container)
}
