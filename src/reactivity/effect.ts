import { extend } from '../shared/index'

let activeEffect

class ReactiveEffect {
  private _fn: any
  active = true
  deps = []

  onStop?: () => void

  constructor(fn, public scheduler?) {
    this._fn = fn
  }

  run() {
    activeEffect = this
    return this._fn()
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
}

const targetMap = new WeakMap()

export function track(target, key) {
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

  if (!activeEffect) return

  dep.add(activeEffect)

  activeEffect.deps.push(dep)
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const dep = depsMap.get(key)
  if (!dep) return

  dep.forEach((effect) => {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  })
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
