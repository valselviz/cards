import { Card } from "./Card";
import { EventType } from "./EventType";

export class DuelEvent {
  eventType: EventType;
  target: Card;

  constructor(eventType: EventType, target: Card) {
    this.eventType = eventType;
    this.target = target;
  }
}
