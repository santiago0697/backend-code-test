import "reflect-metadata";
import InMemoryGeniallyRepository from "../mock/InMemoryGeniallyRepository";
import CreateGeniallyService from "../../../../../src/contexts/core/genially/application/CreateGeniallyService";
import faker from "faker";
import GeniallyNameInvalidLength from "../../../../../src/contexts/core/genially/domain/Exception/GeniallyNameInvalidLength";
import GeniallyDescriptionInvalidLength from "../../../../../src/contexts/core/genially/domain/Exception/GeniallyDescriptionInvalidLength";
import InMemoryEventBus from "../../shared/mock/InMemoryEventBus"
import GeniallyCreatedEvent from "../../../../../src/contexts/core/genially/domain/Event/GeniallyCreatedEvent";

const repository = new InMemoryGeniallyRepository();
const eventBus = new InMemoryEventBus();
const service = new CreateGeniallyService(repository, eventBus);

afterAll(() => {
    eventBus.clear();
    repository.clear();
});

describe('CreateGeniallyService', () => {
    it('Should create geanily correctly', async () => {
        const geniallyServiceRequest = {
            id: faker.datatype.uuid(),
            name: faker.datatype.string(20),
            description: faker.datatype.string(125)
        };

        await service.execute(geniallyServiceRequest);

        const geniallyCreated = await repository.find(geniallyServiceRequest.id);

        expect(geniallyCreated.name.value).toEqual(geniallyServiceRequest.name);
        expect(geniallyCreated.description.value).toEqual(geniallyServiceRequest.description);
        expect(geniallyCreated.createdAt).toBeDefined();

        expect(eventBus.events).toHaveLength(1);
        expect(eventBus.events.shift().eventName).toBe(GeniallyCreatedEvent.EVENT_NAME);
    });

    it('Should throw exception when name is more than 20 characters', async () => {
        const geniallyServiceRequest = {
            id: faker.datatype.uuid(),
            name: faker.datatype.string(21),
            description: faker.datatype.string(125)
        };

        await expect(service.execute(geniallyServiceRequest)).rejects.toThrow(GeniallyNameInvalidLength);
    });

    it('Should throw exception when name is less than 3 characters', async () => {
        const geniallyServiceRequest = {
            id: faker.datatype.uuid(),
            name: faker.datatype.string(2),
            description: faker.datatype.string(125)
        };

        await expect(service.execute(geniallyServiceRequest)).rejects.toThrow(GeniallyNameInvalidLength);
    });

    it('Should throw exception when description is more than 125 characters', async () => {
        const geniallyServiceRequest = {
            id: faker.datatype.uuid(),
            name: faker.datatype.string(15),
            description: faker.datatype.string(126)
        };

        await expect(service.execute(geniallyServiceRequest)).rejects.toThrow(GeniallyDescriptionInvalidLength);
    });
});