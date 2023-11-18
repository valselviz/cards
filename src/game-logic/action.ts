import { Card } from "./card";

export class Action {
  shouldSelectTarget: () => boolean;

  selectionInfo: string;

  execute: () => void;

  constructor(
    execute: () => void,
    shouldSelectTarget: () => boolean = () => false,
    selectionInfo: string = ""
  ) {
    this.execute = execute;
    this.shouldSelectTarget = shouldSelectTarget;
    this.selectionInfo = selectionInfo;
  }
}
