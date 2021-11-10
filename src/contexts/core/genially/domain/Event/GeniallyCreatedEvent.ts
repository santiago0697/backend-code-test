import DomainEvent from "../../../../../contexts/core/shared/domain/event/DomainEvent";

export default class GeniallyCreatedEvent extends DomainEvent {
    public get eventName(): string {
        return "genially.created"
    }
}