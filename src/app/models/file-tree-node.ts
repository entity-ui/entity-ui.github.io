import { TreeData } from 'ng.tree';

export enum FileTreeNodeType {
  Unknown = 'Unknown',
  File = 'File',
  Folder = 'Folder',
}

module Private {
  export interface ValueByNodeType<TValue> {
    [key: string]: TValue;
  }

  export const isOpenByNodeType: ValueByNodeType<boolean> = {
    [FileTreeNodeType.Unknown as string]: false,
    [FileTreeNodeType.File as string]: false,
    [FileTreeNodeType.Folder as string]: true,
  };

  export const iconSelectorByNodeType: ValueByNodeType<string> = {
    [FileTreeNodeType.Unknown as string]: null,
    [FileTreeNodeType.File as string]: null,
    [FileTreeNodeType.Folder as string]: 'computer',
  };

  export const nameSelectorByNodeType: ValueByNodeType<string> = {
    [FileTreeNodeType.Unknown as string]: null,
    [FileTreeNodeType.File as string]: null,
    [FileTreeNodeType.Folder as string]: 'warning',
  };
}

export class FileTreeNode implements TreeData {
  readonly type: FileTreeNodeType;

  get isFile(): boolean {
    return this.type === FileTreeNodeType.File;
  }

  get isFolder(): boolean {
    return this.type === FileTreeNodeType.Folder;
  }

  readonly path: string;
  readonly content: string;

  //#region TreeData implementation

  name: string;

  get isOpen(): boolean {
    return this.valueByNodeType(Private.isOpenByNodeType, this.type);
  }
  set isOpen(value: boolean) {}

  get iconSelector(): string {
    return this.valueByNodeType(Private.iconSelectorByNodeType, this.type);
  }
  set iconSelector(value: string) {}

  get nameSelector(): string {
    return this.valueByNodeType(Private.nameSelectorByNodeType, this.type);
  }
  set nameSelector(value: string) {}

  isChecked: boolean = false;

  private _nodes: FileTreeNode[];
  get nodes(): FileTreeNode[] {
    return this._nodes;
  }
  set nodes(value: FileTreeNode[]) {
    if (this.type === FileTreeNodeType.Folder) {
      this._nodes = value;
    } else {
      this._nodes = null;
    }
  }

  //#endregion

  private constructor(
    type: FileTreeNodeType,
    path: string,
    name: string,
    content: string,
    nodes: FileTreeNode[],
  ) {
    this.type = type;
    this.path = path;
    this.name = name;
    this.content = content;
    this.nodes = nodes;
  }

  static createFileNode(
    path: string,
    name: string,
    content: string,
  ): FileTreeNode {
    return new FileTreeNode(
      FileTreeNodeType.File,
      path,
      name,
      content,
      null,
    );
  }

  static createFolderNode(
    path: string,
    name: string,
    nodes: FileTreeNode[] = [],
  ): FileTreeNode {
    return new FileTreeNode(
      FileTreeNodeType.Folder,
      path,
      name,
      null,
      nodes,
    );
  }

  private valueByNodeType<TValue>(
    valueDict: Private.ValueByNodeType<TValue>,
    nodeType: FileTreeNodeType,
  ): TValue {
    let result: TValue;

    if (nodeType in valueDict) {
      result = valueDict[nodeType];
    } else {
      result = valueDict[FileTreeNodeType.Unknown];
    }

    return result;
  }
}