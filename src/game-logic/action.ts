export class Action {
  selectionTargetAction: boolean = false;

  description: string = "";

  execute: () => void;

  constructor(execute: () => void){
    this.execute = execute;
  }
}