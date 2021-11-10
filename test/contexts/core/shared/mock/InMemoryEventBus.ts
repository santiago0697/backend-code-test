import EventBus from "../../../../../src/contexts/core/shared/domain/bus/EventBus";
import DomainEvent from "../../../../../src/contexts/core/shared/domain/event/DomainEvent";

export default class InMemoryEventBus implements EventBus {
    private _events: DomainEvent[] = [];

    public async publish(events: DomainEvent[]): Promise<void> {
        this._events.push(...events);
    }

    public get events(): DomainEvent[] {
        return this._events;
    }

    public clear() {
        this._events = [];
    }
}