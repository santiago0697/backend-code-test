import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyDescription from "../domain/ValueObject/GeniallyDescription";
import GeniallyName from "../domain/ValueObject/GeniallyName";

type CreateGeniallyServiceRequest = {
  id: string;
  name: string;
  description: string;
};

export default class CreateGeniallyService {
  constructor(private repository: GeniallyRepository) { }

  public async execute(req: CreateGeniallyServiceRequest): Promise<Genially> {
    const { id, name, description } = req;
    const geniallyName = GeniallyName.create(name);
    const geniallyDescription = GeniallyDescription.create(description);

    const genially = Genially.create(id, geniallyName, geniallyDescription);

    await this.repository.save(genially);

    return genially;
  }
}
