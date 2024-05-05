import { proxyRefs } from '../reactivity'
import { shallowReadonly } from '../reactivity/reactive'
import { emit } from './componentEmit'
import { initProps } from './componentProps'
import { PublicInstanceProxyHandlers } from './componentPublicInstance'
import { initSlots } from './componentSlots'

let currentInstance = null

let compile
export function registerRuntimeCompiler(_compiler) {
  compile = _compiler
}

export function createComponentInstance(vnode, parent) {
  const instance = {
    vnode,
    type: vnode.type,
    next: null,
    setupState: {},
    props: {},
    slots: {},
    provides: parent ? parent.provides : {},
    parent,
    proxy: null,
    isMounted: false,
    subTree: {},
    ctx: {}, // context 对象
    emit: () => {},
  }

  instance.ctx = {
    _: instance,
  }

  instance.emit = emit.bind(null, instance) as any

  return instance
}

export function setupComponent(instance) {
  initProps(instance, instance.vnode.props)

  initSlots(instance, instance.vnode.children)

  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
  // init
  const Component = instance.type

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)

  const { setup } = Component

  if (setup) {
    setCurrentInstance(instance)

    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    })

    currentInstance = null

    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance, setupResult) {
  if (typeof setupResult === 'function') {
    instance.render = setupResult
  } else if (typeof setupResult === 'object') {
    instance.setupState = proxyRefs(setupResult)
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
  const Component = instance.type

  if (!instance.render) {
    // 如果 compile 有值 并且当然组件没有 render 函数，那么就需要把 template 编译成 render 函数
    if (compile && !Component.render) {
      if (Component.template) {
        // 这里就是 runtime 模块和 compile 模块结合点
        const template = Component.template
        Component.render = compile(template)
      }
    }

    instance.render = Component.render
  }
}

export function getCurrentInstance() {
  return currentInstance
}

function setCurrentInstance(instance) {
  currentInstance = instance
}
