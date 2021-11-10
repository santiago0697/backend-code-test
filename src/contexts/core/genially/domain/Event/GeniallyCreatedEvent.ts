import DomainEvent from "../../../../../contexts/core/shared/domain/event/DomainEvent";

export default class GeniallyCreatedEvent extends DomainEvent {
    public static EVENT_NAME = "genially.created";

    public get eventName(): string {
        return GeniallyCreatedEvent.EVENT_NAME;
    }
}