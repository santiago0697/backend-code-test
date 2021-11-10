import EventBus from "../../../../../src/contexts/core/shared/domain/bus/EventBus";
import DomainEvent from "../../../../../src/contexts/core/shared/domain/event/DomainEvent";

export default class MockEventBus implements EventBus {
    private publishSpy = jest.fn();

    public load(): void {
        this.publishSpy();
    }

    public async publish(events: DomainEvent[]): Promise<void> {
        return Promise.resolve(undefined);
    }
}