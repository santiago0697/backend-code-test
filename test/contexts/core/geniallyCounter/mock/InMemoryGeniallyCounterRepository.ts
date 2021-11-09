import GeniallyCounter from "../../../../../src/contexts/core/geniallyCounter/domain/GeniallyCounter";
import GeniallyCounterRepository from "../../../../../src/contexts/core/geniallyCounter/domain/GeniallyCounterRepository";

export default class InMemoryGeniallyCounterRepository implements GeniallyCounterRepository {

    static geniallyCounter: GeniallyCounter;

    async save(geniallyCounter: GeniallyCounter): Promise<void> {
        InMemoryGeniallyCounterRepository.geniallyCounter = geniallyCounter;
    }

    async get(): Promise<GeniallyCounter> {
        return InMemoryGeniallyCounterRepository.geniallyCounter;
    }
}