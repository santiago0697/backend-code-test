import Genially from "../domain/Genially";
import GeniallyFinder from "../domain/GeniallyFinder";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyName from "../domain/ValueObject/GeniallyName";

export default class RenameGeniallyService {
  private readonly geniallyFinder: GeniallyFinder

  constructor(private readonly repository: GeniallyRepository){
    this.geniallyFinder = new GeniallyFinder(this.repository);
  }

  public async execute(geniallyId: string, geniallyName: string): Promise<Genially> {
    const genially = await this.geniallyFinder.find(geniallyId);
    const newGeniallyName = GeniallyName.create(geniallyName);

    genially.rename(newGeniallyName);

    this.repository.save(genially);

    return genially;
  }
}
