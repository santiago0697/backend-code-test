import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyName from "../domain/ValueObject/GeniallyName";

type CreateGeniallyServiceRequest = {
  id: string;
  name: string;
  description: string;
};

export default class CreateGeniallyService {
  constructor(private repository: GeniallyRepository) {}

  public async execute(req: CreateGeniallyServiceRequest): Promise<Genially> {
    const { id, name, description } = req;
    const geniallyName = GeniallyName.create(name);

    const genially = new Genially(id, geniallyName, description);

    await this.repository.save(genially);

    return genially;
  }
}
