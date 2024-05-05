export * from '@guid-mini-vue/runtime-dom'
import { baseCompile } from '@guid-mini-vue/compiler-core'
import * as runtimeDom from '@guid-mini-vue/runtime-dom'
import { registerRuntimeCompiler } from '@guid-mini-vue/runtime-dom'

export function compileToFunction(template) {
  const { code } = baseCompile(template)

  const render = new Function('Vue', code)(runtimeDom)

  return render
}

registerRuntimeCompiler(compileToFunction)
