import type {
  API,
  ASTNode,
  ASTPath,
  Block,
  CommentBlock,
  CommentLine,
  FileInfo,
  Line,
  Node,
  Options,
} from 'jscodeshift';

type CommentKind = Block | Line | CommentBlock | CommentLine;

export default function transform(
  file: FileInfo,
  api: API,
  options ? : Options,
): string | undefined {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Update import statements
  root.find(j.ImportDeclaration).forEach((path) => {
    if (
      j.Literal.check(path.node.source) &&
      path.node.source.value === '@gatsbyjs/reach-router'
    ) {
      const specifiers = path.node.specifiers;
      const newSpecifiers = specifiers.map((specifier) => {
        if (
          j.ImportSpecifier.check(specifier) &&
          specifier.imported.name === 'useNavigate'
        ) {
          return j.importSpecifier(j.identifier('navigate'));
        }
        return specifier;
      });
      path.node.specifiers = newSpecifiers;
      path.node.source = j.literal('gatsby');
      dirtyFlag = true;
    }
  });

  // Replace `useNavigate` with `navigate` in the code
  root.find(j.CallExpression, { callee: { name: 'useNavigate' } }).forEach(
    (path) => {
      const parent = path.parentPath;
      if (
        j.VariableDeclarator.check(parent.node) &&
        j.Identifier.check(parent.node.id)
      ) {
        j(parent).remove();
        dirtyFlag = true;
      }
    },
  );

  return dirtyFlag ? root.toSource() : undefined;
}