import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { TreeConfig } from 'ng.tree';

import { FileTreeNode } from '../../models/file-tree-node';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss']
})
export class FileTreeComponent implements OnInit {
  @Output() nodeCheckedChanged = new EventEmitter<FileTreeNode>();

  @Input() nodes: FileTreeNode[];

  readonly treeConfig: TreeConfig = {
    dataMap: {
      children: 'nodes',
    },

    onClick: (node: FileTreeNode): boolean => {
      if (node.isFile) {
        if (node.isChecked) {
          // Nothing to do
        } else {
          this.uncheckAllNodes();
          node.isChecked = true;
          this.nodeCheckedChanged.emit(node);
        }
      }

      return false;
    },
  };

  constructor() { }

  ngOnInit() {
  }

  private uncheckAllNodes(): void {
		this.uncheckNodesRecursively(this.nodes);
	}

	private uncheckNodesRecursively(nodes: FileTreeNode[]): void {
		for (const curNode of nodes) {
			if (curNode.isChecked) {
				curNode.isChecked = false;
				this.nodeCheckedChanged.emit(curNode);
			}

			if (curNode.nodes) {
				this.uncheckNodesRecursively(curNode.nodes);
			}
		}
	}
}
