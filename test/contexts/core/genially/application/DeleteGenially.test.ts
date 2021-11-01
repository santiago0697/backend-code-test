import faker from "faker";
import Genially from "../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyDescription from "../../../../../src/contexts/core/genially/domain/ValueObject/GeniallyDescription";
import GeniallyName from "../../../../../src/contexts/core/genially/domain/ValueObject/GeniallyName";
import InMemoryGeniallyRepository from "../mock/InMemoryGeniallyRepository";
import DeleteGeniallyService from "../../../../../src/contexts/core/genially/application/DeleteGeniallyService";
import GeniallyNotExist from "../../../../../src/contexts/core/genially/domain/Exception/GeniallyNotExist";


const repository = new InMemoryGeniallyRepository()
const service = new DeleteGeniallyService(repository);
let genially: Genially;

beforeEach(async () => {
    //preparas mocks
    genially = new Genially(
        faker.datatype.uuid(),
        new GeniallyName(faker.datatype.string(5)),
        new GeniallyDescription(faker.datatype.string(20))
    );
    await repository.save(genially);
});

afterAll(async () => {
    repository.clear();
});

describe("DeleteGeniallyService", async () => {
    it("Should delete an existing genially", async () => {
        await service.execute(genially.id);
        await expect(repository.find(genially.id)).resolves.toBeDefined();
    });

    it('Should throw error when delete one that not exists', async () => {
        await expect(service.execute(faker.datatype.uuid())).rejects.toThrow(GeniallyNotExist);
    })
});