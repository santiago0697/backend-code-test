import { injectable, multiInject } from "inversify";
import EventBus from "../../domain/bus/EventBus";
import DomainEvent from "../../domain/event/DomainEvent";
import EventHandler from "../../domain/event/EventHandler";

@injectable()
export default class InMemoryEventBus implements EventBus {
    private handlers: Map<string, EventHandler[]> = new Map();

    public constructor(@multiInject("EventHandler") private eventHandlers: EventHandler[]) {
        this.groupHandlersByEvent();
    }

    async publish(events: DomainEvent[]): Promise<void> {
        events.forEach(async (event: DomainEvent) => {
            const handlersForEvent = this.handlers.get(event.eventName);
            handlersForEvent.forEach(async (handler: EventHandler) => {
                await handler.consume(event);
            });
        });
    }

    private groupHandlersByEvent(): void {
        this.eventHandlers.forEach((eventHandler: EventHandler) => {
            const eventName = eventHandler.subscribedTo();

            const handlerGroup = this.handlers.get(eventName);
            if (!handlerGroup) {
                this.handlers.set(eventName, [eventHandler]);
            } else {
                handlerGroup.push(eventHandler);
                this.handlers.set(eventName, handlerGroup);
            }
        });
    }
}