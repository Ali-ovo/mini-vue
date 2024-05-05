import { NodeTypes } from './ast'

enum TagType {
  Start,
  End,
}

export function baseParse(content: string) {
  const context = createParserContext(content)

  return createRoot(parseChildren(context, []))
}

function parseChildren(context, ancestors) {
  const nodes: any = []

  while (!isEnd(context, ancestors)) {
    let node
    const s = context.source
    if (s.startsWith('{{')) {
      node = parseInterpolation(context)
    } else if (s[0] === '<') {
      if (/[a-z]/i.test(s[1])) {
        node = parseElement(context, ancestors)
      }
    }

    if (!node) {
      node = parseText(context)
    }

    nodes.push(node)
  }

  return nodes
}

function isEnd(context, ancestors) {
  const s = context.source

  // 遇到结束标签也结束
  if (s.startsWith('</')) {
    for (let i = ancestors.length - 1; i >= 0; i--) {
      const tag = ancestors[i].tag

      if (startsWithEndTagOpen(s, tag)) {
        return true
      }
    }
  }

  // if (parentTag && s.startsWith(`</${parentTag}>`)) {
  //   return true
  // }

  // 如果 source 为空，那么就是结束了
  return !s
}

function parseText(context) {
  let endIndex = context.source.length
  let endTokens = ['<', '{{']

  for (let i = 0; i < endTokens.length; i++) {
    const token = endTokens[i]
    const index = context.source.indexOf(token)
    if (~index) {
      endIndex = Math.min(endIndex, index)
    }
  }

  const content = parseTextData(context, endIndex)

  return {
    type: NodeTypes.TEXT,
    content,
  }
}

function parseElement(context, ancestors) {
  // 解析 tag
  const element: any = parseTag(context, TagType.Start)
  ancestors.push(element)
  element.children = parseChildren(context, ancestors)
  ancestors.pop()

  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, TagType.End)
  } else {
    throw new Error(`缺失结束标签：${element.tag}`)
  }

  return element
}

function parseTag(context, type: TagType) {
  // 解析 tag
  const match: any = /^<\/?([a-z]*)/i.exec(context.source)

  const tag = match[1]

  // 跳过 tag
  advanceBy(context, match[0].length)
  advanceBy(context, 1)

  if (type === TagType.End) {
    return
  }

  return {
    type: NodeTypes.ELEMENT,
    tag,
  }
}

function parseTextData(context: any, length) {
  // 获取 content
  const content = context.source.slice(0, length)

  // 推进
  advanceBy(context, length)

  return content
}

function parseInterpolation(context) {
  const openDelimiter = '{{'
  const closeDelimiter = '}}'

  const closeIndex = context.source.indexOf(closeDelimiter, openDelimiter.length)

  advanceBy(context, openDelimiter.length)

  const rawContentLength = closeIndex - openDelimiter.length

  const rawContent = parseTextData(context, rawContentLength)
  const content = rawContent.trim()

  advanceBy(context, closeDelimiter.length)

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: content,
    },
  }
}

function startsWithEndTagOpen(source, tag) {
  return source.startsWith('</') && source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase()
}

function advanceBy(context, length) {
  context.source = context.source.slice(length)
}

function createRoot(children) {
  return {
    children,
    type: NodeTypes.ROOT,
    helpers: [],
  }
}

function createParserContext(content: string) {
  return {
    source: content,
  }
}
