import { NodeTypes, createVNodeCall } from '../ast'

export function transformElement(node, context) {
  if (node.type === NodeTypes.ELEMENT) {
    return () => {
      const vnodeTag = JSON.stringify(node.tag)

      let vnodeProps

      const children = node.children
      let vnodeChildren = children[0]

      node.codegenNode = createVNodeCall(context, vnodeTag, vnodeProps, vnodeChildren)
    }
  }
}
