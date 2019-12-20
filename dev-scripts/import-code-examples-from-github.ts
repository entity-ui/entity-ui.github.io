import * as fs from 'fs';
import syncRequest from 'sync-request';
import * as JSZip from 'jszip';

import { FileTreeNodeFromZipHelper } from './lib/file-tree-node-from-zip-helper';
import { FileTreeNode } from '../src/app/models/file-tree-node';

const urlTimestamp = (new Date()).getTime();
const repoArchiveUrl = `https://github.com/entity-ui/entity-ui-site-code-examples/archive/master.zip?timestamp=${urlTimestamp}`;
const repoArchive = syncRequest('GET', repoArchiveUrl);
const repoArchiveBase64 = repoArchive.getBody().toString('base64');

const zip = new JSZip();
zip.loadAsync(repoArchiveBase64, { base64: true })
  .then(
    async zip => {
      const writeNodesCode = (
        nodesCode: string,
        nodes: FileTreeNode[],
        tabs: number,
      ): string => {
        const tabsStr = '  '.repeat(tabs);

        for (const curNode of nodes) {
          if (curNode.isFolder) {
            nodesCode += `${tabsStr}FileTreeNode.createFolderNode('${curNode.path}', '${curNode.name}', [\n`;
            nodesCode = writeNodesCode(nodesCode, curNode.nodes, tabs + 1);
            nodesCode += `${tabsStr}]),\n`;
          } else {
            nodesCode += `${tabsStr}FileTreeNode.createFileNode('${curNode.path}', '${curNode.name}', String.raw\`${curNode.content}\`),\n`;
          }
        }

        return nodesCode;
      };

      const fileTreeNodeFromZipHelper = new FileTreeNodeFromZipHelper();
      const nodes = await fileTreeNodeFromZipHelper.fromZip(zip);

      const codeFile_path = './src/app/data/code-examples-data.ts';
      const codeFile_nodesCode = writeNodesCode('', nodes, 2);
      const codeFile_code = String.raw
`import { FileTreeNode } from '../models/file-tree-node';

export module CodeExamplesData {
  export const nodes: FileTreeNode[] = [
${codeFile_nodesCode}
  ];
}`;

      fs.writeFileSync(codeFile_path, codeFile_code);
    },
  );