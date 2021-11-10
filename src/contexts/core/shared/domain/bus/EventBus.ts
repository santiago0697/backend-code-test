import DomainEvent from "../event/DomainEvent";

export default interface EventBus {
    publish(events: DomainEvent[]): Promise<void>;
}