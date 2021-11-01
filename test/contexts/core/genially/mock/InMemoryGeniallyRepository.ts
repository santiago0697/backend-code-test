import Genially from "../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyRepository from "../../../../../src/contexts/core/genially/domain/GeniallyRepository";

export default class InMemoryGeniallyRepository implements GeniallyRepository {
  private geniallys: Genially[] = [];

  async save(genially: Genially): Promise<void> {
    this.geniallys = this.geniallys.filter((_genially) => genially.id !== _genially.id);
    this.geniallys.push(genially);
  }

  async find(id: string): Promise<Genially> {
    return this.geniallys.find((genially) => genially.id === id);
  }

  async delete(genially: Genially): Promise<void> {
    await this.save(genially);
  }

  public clear(): void{
      this.geniallys = [];
  }
}
