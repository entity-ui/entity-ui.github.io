import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { FileTreeNode } from '../../models/file-tree-node';

@Component({
  selector: 'app-file-explorer-with-viewer',
  templateUrl: './file-explorer-with-viewer.component.html',
  styleUrls: ['./file-explorer-with-viewer.component.scss']
})
export class FileExplorerWithViewerComponent implements OnInit {
  @Input() nodes: FileTreeNode[];
  curFileNode: FileTreeNode;

  constructor() {}

  ngOnInit() {
  }

  onNodeCheckedChanged(node: FileTreeNode): void {
    if (node.isFile && node.isChecked) {
      this.curFileNode = node;
    }
  }
}
