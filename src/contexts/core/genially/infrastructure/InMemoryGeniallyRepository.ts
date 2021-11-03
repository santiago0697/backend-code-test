import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";

export default class InMemoryGeniallyRepository implements GeniallyRepository {
  private static geniallys: Genially[] = [];

  async save(genially: Genially): Promise<void> {
    InMemoryGeniallyRepository.geniallys = InMemoryGeniallyRepository.geniallys
      .filter((_genially) => genially.id !== _genially.id);

    InMemoryGeniallyRepository.geniallys.push(genially);
  }

  async find(id: string): Promise<Genially> {
    return InMemoryGeniallyRepository.geniallys.find((genially) => genially.id === id);
  }

  async delete(genially: Genially): Promise<void> {
    await this.save(genially);
  }
}
