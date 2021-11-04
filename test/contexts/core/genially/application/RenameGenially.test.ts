import "reflect-metadata";
import faker from "faker";
import InMemoryGeniallyRepository from "../mock/InMemoryGeniallyRepository";
import RenameGeniallyService from "../../../../../src/contexts/core/genially/application/RenameGeniallyService";
import Genially from "../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyName from "../../../../../src/contexts/core/genially/domain/ValueObject/GeniallyName";
import GeniallyDescription from "../../../../../src/contexts/core/genially/domain/ValueObject/GeniallyDescription";
import GeniallyNotExist from "../../../../../src/contexts/core/genially/domain/Exception/GeniallyNotExist";
import GeniallyNameInvalidLength from "../../../../../src/contexts/core/genially/domain/Exception/GeniallyNameInvalidLength";

const repository = new InMemoryGeniallyRepository();
const service = new RenameGeniallyService(repository);
let genially: Genially;

beforeEach(async () => {
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

describe("RenameGeniallyService", () => {
    it("Should rename genially and set modifiedAt delta", async () => {
        const newGeniallyName = faker.datatype.string(15);
        await service.execute(genially.id, newGeniallyName);

        const afterRenameGenially = await repository.find(genially.id);
        expect(afterRenameGenially.name.value).toBe(newGeniallyName);
        expect(afterRenameGenially.modifiedAt).toBeDefined();
    });

    it("Should throw error if rename unexisting genially", async () => {
        const newGeniallyName = faker.datatype.string(15);
        const geniallyId = faker.datatype.uuid();

        await expect(service.execute(geniallyId, newGeniallyName)).rejects.toThrow(GeniallyNotExist);
    });

    it("Show throw error if the new name exceds the character limitation", async () => {
        const newGeniallyName = faker.datatype.string(35);

        await expect(service.execute(genially.id, newGeniallyName)).rejects.toThrow(GeniallyNameInvalidLength);
    });
});