import GeniallyCounter from "./GeniallyCounter";
import GeniallyCounterRepository from "./GeniallyCounterRepository";

export default class GetCurrentGeniallyCounter {
    public constructor(private repository: GeniallyCounterRepository) { }

    public async execute(): Promise<GeniallyCounter> {
        const geniallyCounter = await this.repository.get();
        if (geniallyCounter === undefined) {
            return GeniallyCounter.initializeCounter();
        }
        return geniallyCounter;
    }
}