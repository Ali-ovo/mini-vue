import { ShapeFlags } from "@guid-mini-vue/shared"

export function initSlots(instance, children) {
  const { vnode } = instance

  if (vnode.shapeFlag & ShapeFlags.SLOTS_CHILDREN) {
    normalizeObjectSlots(children, instance)
  }
}

function normalizeObjectSlots(children: any, instance: any) {
  const slots = {}
  for (const key in children) {
    const value = children[key]
    slots[key] = (props) => normalizeSlotValue(value(props))
  }

  instance.slots = slots
}

function normalizeSlotValue(value) {
  return Array.isArray(value) ? value : [value]
}
