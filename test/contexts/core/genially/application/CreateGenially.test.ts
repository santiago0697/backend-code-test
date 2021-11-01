import InMemoryGeniallyRepository from "../mock/InMemoryGeniallyRepository";
import CreateGeniallyService from "../../../../../src/contexts/core/genially/application/CreateGeniallyService";
import * as faker from "faker";
import GeniallyNameInvalidLength from "../../../../../src/contexts/core/genially/domain/Exception/GeniallyNameInvalidLength";

const repository = new InMemoryGeniallyRepository()
const service = new CreateGeniallyService(repository);

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
        expect(geniallyCreated.description).toEqual(geniallyServiceRequest.description);
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
});