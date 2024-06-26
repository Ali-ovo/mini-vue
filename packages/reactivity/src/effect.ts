import { extend } from '@guid-mini-vue/shared'
import { createDep } from './dep'

let activeEffect
let shouldTrack

export class ReactiveEffect {
  private _fn: any
  active = true
  deps = []
  onStop?: () => void

  constructor(fn, public scheduler?) {
    this._fn = fn
  }

  run() {
    if (!this.active) {
      return this._fn()
    }

    shouldTrack = true
    activeEffect = this

    const result = this._fn()
    // reset
    shouldTrack = false
    activeEffect = undefined

    return result
  }

  stop() {
    if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }

      this.active = false
    }
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })

  effect.deps.length = 0
}

const targetMap = new WeakMap()

export function track(target, key) {
  if (!isTracking()) return

  let depsMap = targetMap.get(target)

  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  trackEffects(dep)
}

export function trackEffects(dep) {
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    ;(activeEffect as any).deps.push(dep)
  }
}

export function isTracking() {
  return shouldTrack && activeEffect !== undefined
}

export function trigger(target, key) {
  let deps: Array<any> = []

  const depsMap = targetMap.get(target)

  if (!depsMap) return

  const dep = depsMap.get(key)
  deps.push(dep)

  const effects: Array<any> = []

  deps.forEach((dep) => {
    // 这里解构 dep 得到的是 dep 内部存储的 effect
    effects.push(...dep)
  })

  triggerEffects(createDep(effects))
}

export function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export function effect(fn, options: any = {}) {
  // fn
  const _effect = new ReactiveEffect(fn, options.scheduler)

  // extend options
  extend(_effect, options)

  _effect.run()

  const runner: any = _effect.run.bind(_effect)

  runner.effect = _effect

  return runner
}

export function stop(runner) {
  runner.effect.stop()
}
