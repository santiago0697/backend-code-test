import { DomainEvent } from "./DomainEvent";

export default interface EventHandler {
    consume(event: DomainEvent): Promise<void>;

    subscribedTo(): DomainEvent;
}