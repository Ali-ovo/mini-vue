export * from './toDisplayString'

export const extend = Object.assign

export const isObject = (val) => {
  return val !== null && typeof val === 'object'
}

export const hasChanged = (value, newValue) => {
  return !Object.is(value, newValue)
}

export function hasOwn(val, key) {
  return Object.prototype.hasOwnProperty.call(val, key)
}

export function isString(val) {
  return typeof val === 'string'
}

export { ShapeFlags } from './ShapeFlags'
