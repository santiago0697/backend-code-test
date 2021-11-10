import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyDescription from "../domain/ValueObject/GeniallyDescription";
import GeniallyName from "../domain/ValueObject/GeniallyName";
import { injectable, inject } from "inversify";
import EventBus from "../../shared/domain/bus/EventBus";

type CreateGeniallyServiceRequest = {
  id: string;
  name: string;
  description: string;
};

@injectable()
export default class CreateGeniallyService {
  constructor(
    @inject("GeniallyRepository") private repository: GeniallyRepository,
    @inject("EventBus") private eventBus: EventBus
  ) { }

  public async execute(req: CreateGeniallyServiceRequest): Promise<Genially> {
    const { id, name, description } = req;
    const geniallyName = GeniallyName.create(name);
    const geniallyDescription = GeniallyDescription.create(description);

    const genially = Genially.create(id, geniallyName, geniallyDescription);

    await this.repository.save(genially);

    await this.eventBus.publish(genially.pullDomainEvents());

    return genially;
  }
}
