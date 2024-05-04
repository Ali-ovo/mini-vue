import { generate } from '../src/codegen'
import { baseParse } from '../src/parse'
import { transform } from '../src/transform'
import { transformExpression } from '../src/transforms/transformExpression'

describe('codegen', () => {
  it('string', () => {
    const ast = baseParse('hi')

    transform(ast)

    const { code } = generate(ast)

    expect(code).toMatchSnapshot()
  })
})

test("interpolation module", () => {
  const ast = baseParse("{{ message }}");
  transform(ast, {
    nodeTransforms: [transformExpression],
  });

  const { code } = generate(ast);
  expect(code).toMatchSnapshot();
});

// test("element and interpolation", () => {
//   const ast = baseParse("<div>hi,{{msg}}</div>");
//   transform(ast, {
//     nodeTransforms: [transformElement, transformText, transformExpression],
//   });

//   const { code } = generate(ast);
//   expect(code).toMatchSnapshot();
// });
