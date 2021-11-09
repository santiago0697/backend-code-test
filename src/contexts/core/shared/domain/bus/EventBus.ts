import { DomainEvent } from "../event/DomainEvent";

export interface EventBus {
    publish(events: DomainEvent[]): Promise<void>;
}