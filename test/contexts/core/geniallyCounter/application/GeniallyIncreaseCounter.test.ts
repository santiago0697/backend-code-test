import "reflect-metadata";
import InMemoryGeniallyCounterRepository from "../mock/InMemoryGeniallyCounterRepository";
import GeniallyIncreaseCounter from "../../../../../src/contexts/core/geniallyCounter/application/GeniallyIncreaseCounter"
import GeniallyCounter from "../../../../../src/contexts/core/geniallyCounter/domain/GeniallyCounter";

const repository = new InMemoryGeniallyCounterRepository()
const service = new GeniallyIncreaseCounter(repository);

describe("GeniallyIncreaseCounter", () => {
    it("Should increase counter that is no initialized", async () => {
        await service.execute();
        const geniallyCounter = await repository.get();
        expect(geniallyCounter.counter).toBe(1);
    });

    it("Should increase counter", async () => {
        const geniallyCounter = new GeniallyCounter(5);
        await repository.save(geniallyCounter);

        await service.execute();

        const currentGeniallyCounter = await repository.get();
        expect(currentGeniallyCounter.counter).toBe(6);
    });
});