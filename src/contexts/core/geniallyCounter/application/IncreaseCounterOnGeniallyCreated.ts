import { inject, injectable } from "inversify";
import GeniallyCreatedEvent from "../../genially/domain/Event/GeniallyCreatedEvent";
import EventHandler from "../../shared/domain/event/EventHandler";
import GeniallyIncreaseCounter from "./GeniallyIncreaseCounter";

@injectable()
export default class IncreaseCounterOnGeniallyCreated implements EventHandler {
    public constructor(@inject("GeniallyIncreaseCounter") private service: GeniallyIncreaseCounter) { }

    async consume(event: GeniallyCreatedEvent): Promise<void> {
        await this.service.execute();
    }

    subscribedTo(): string {
        return GeniallyCreatedEvent.EVENT_NAME
    }
}