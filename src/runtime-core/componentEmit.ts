export function emit(instance, event, ...args) {
  const { props } = instance

  const capitalized = (str: string) => {
    return str.replace(/^[a-z]/, (c) => c.toUpperCase())
  }

  // add -> onAdd
  // add-foo -> onAddFoo
  const camelized = (str: string) => {
    return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
  }

  const toHandlerKey = (str: string) => {
    return str ? 'on' + capitalized(str) : ''
  }

  const handlerName = toHandlerKey(camelized(event))

  const handler = props[handlerName]
  handler && handler(args)
}
