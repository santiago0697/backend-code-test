import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyNotExist from "./Exception/GeniallyNotExist";
import Genially from "../domain/Genially";
 
export default class GeniallyFinder {
  constructor(private repository: GeniallyRepository) { }

  public async find(geniallyId: string): Promise<Genially> {
      const genially = await this.repository.find(geniallyId);
      if(genially === undefined) {
          throw new GeniallyNotExist(geniallyId);
      }
      return genially;
  }
}