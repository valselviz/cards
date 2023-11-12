export class Action {
  selectionTargetAction: boolean;

  selectionInfo: string;

  execute: () => void;

  constructor(
    execute: () => void,
    selectionTargetAction: boolean = false,
    selectionInfo: string = ""
  ) {
    this.execute = execute;
    this.selectionTargetAction = selectionTargetAction;
    this.selectionInfo = selectionInfo;
  }
}
