import { Card } from "./Card";
import { EventType } from "./EventType";

export class DuelEvent {
  eventType: EventType;
  target: Card | null;

  constructor(eventType: EventType, target: Card | null) {
    this.eventType = eventType;
    this.target = target;
  }
}
