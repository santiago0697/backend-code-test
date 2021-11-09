import { inject } from "inversify";
import GeniallyCounterRepository from "../domain/GeniallyCounterRepository";
import GetCurrentGeniallyCounter from "../domain/GetCurrentGeniallyCounter";

export default class GeniallyIncreaseCounter {
    private getCurrentGeniallyCounter: GetCurrentGeniallyCounter;

    public constructor(@inject("GeniallyCounterRepository") private repository: GeniallyCounterRepository) {
        this.getCurrentGeniallyCounter = new GetCurrentGeniallyCounter(this.repository);
    }

    public async execute(): Promise<void> {
        const currentGeniallyCounter = await this.getCurrentGeniallyCounter.execute();

        currentGeniallyCounter.increaseCounter();

        this.repository.save(currentGeniallyCounter);
    }
}