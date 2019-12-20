import * as JSZip from 'jszip';

import { FileTreeNode } from '../../src/app/models/file-tree-node';

export class FileTreeNodeFromZipHelper {

  async fromZip(zip: JSZip): Promise<FileTreeNode[]> {
    const items: JSZip.JSZipObject[] = [];

    zip.forEach((relativePath, zipEntry) => {
      items.push(zipEntry);
    });

    await Promise.all(
      items.map(
        cur => {
          return cur.async('text').then(
            content => cur['content'] = content,
          );
        }
      ),
    );

    return this.buildTree(items);
  }

  // Extract a filename from a path
  private getFilename(path: string): string {
    return path.split('/').filter(value => {
      return value && value.length;
    }).reverse()[0];
  }

  // Find sub paths
  private findSubItems(items: JSZip.JSZipObject[], path: string): JSZip.JSZipObject[] {
    // slashes need to be escaped when part of a regexp
    const rePath = path.replace('/', '\\/');
    const re = new RegExp('^' + rePath + '[^\\/]*\\/?$');
    return items.filter(i => {
      return i.name !== path && re.test(i.name);
    });
  }

  // Build tree recursively
  private buildTree(items: JSZip.JSZipObject[], path: string = ''): FileTreeNode[] {
    const nodeList: FileTreeNode[] = [];
    this.findSubItems(items, path).forEach(subItem => {
      const nodeName = this.getFilename(subItem.name);
      let node;
      if (/\/$/.test(subItem.name)) {
        const childNodes = this.buildTree(items, subItem.name);
        node = FileTreeNode.createFolderNode(subItem.name, nodeName, childNodes);
      } else {
        node = FileTreeNode.createFileNode(subItem.name, nodeName, subItem['content']);
      }
      nodeList.push(node);
    });
    return nodeList;
  }
}