import { proxyRefs } from '../reactivity'
import { shallowReadonly } from '../reactivity/reactive'
import { emit } from './componentEmit'
import { initProps } from './componentProps'
import { PublicInstanceProxyHandlers } from './componentPublicInstance'
import { initSlots } from './componentSlots'

let currentInstance = null

export function createComponentInstance(vnode, parent) {
  // console.log('createComponentInstance', parent)

  const component = {
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
    emit: () => {},
  }

  component.emit = emit.bind(null, component) as any

  return component
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
    instance.render = Component.render
  }
}

export function getCurrentInstance() {
  return currentInstance
}

function setCurrentInstance(instance) {
  currentInstance = instance
}
