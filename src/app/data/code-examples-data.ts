import { FileTreeNode } from '../models/file-tree-node';

export module CodeExamplesData {
  export const nodes: FileTreeNode[] = [
    FileTreeNode.createFolderNode('entity-ui-site-code-examples-master/', 'entity-ui-site-code-examples-master', [
      FileTreeNode.createFileNode('entity-ui-site-code-examples-master/README.md', 'README.md', String.raw`# entity-ui-site-code-examples`),
    ]),

  ];
}