import { Card } from "./card";

export class Action {
  shouldWaitForTargetSelection: () => boolean;

  selectionInfo: string;

  execute: () => void;

  constructor(
    execute: () => void,
    shouldWaitForTargetSelection: () => boolean = () => false,
    selectionInfo: string = ""
  ) {
    this.execute = execute;
    this.shouldWaitForTargetSelection = shouldWaitForTargetSelection;
    this.selectionInfo = selectionInfo;
  }
}
