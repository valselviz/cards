import { Card } from "./Card";
import { EventType } from "./EventType";

export class DuelEvent {
  eventType: EventType;
  target: Card | null;
  source: Card | null;

  constructor(
    eventType: EventType,
    target: Card | null,
    source: Card | null = null
  ) {
    this.eventType = eventType;
    this.target = target;
    this.source = source;
  }
}
