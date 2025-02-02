import Genially from "../domain/Genially";
import GeniallyFinder from "../domain/GeniallyFinder";
import GeniallyRepository from "../domain/GeniallyRepository";
import { injectable, inject } from "inversify";

@injectable()
export default class DeleteGeniallyService {
  private readonly geniallyFinder: GeniallyFinder
  constructor(@inject("GeniallyRepository") private readonly repository: GeniallyRepository) {
    this.geniallyFinder = new GeniallyFinder(this.repository);
  }

  public async execute(geniallyId: string): Promise<Genially> {
    const geniallyToDelete = await this.geniallyFinder.find(geniallyId);
    geniallyToDelete.delete();

    this.repository.delete(geniallyToDelete);

    return geniallyToDelete;
  }
}
