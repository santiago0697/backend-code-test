import Genially from "./Genially";

interface GeniallyRepository {
  save(genially: Genially): Promise<void>;

  find(id: string): Promise<Genially>;

  delete(genially: Genially): Promise<void>;
}

export default GeniallyRepository;
