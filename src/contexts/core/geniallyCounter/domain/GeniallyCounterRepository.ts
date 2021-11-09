import GeniallyCounter from "./GeniallyCounter";

export default interface GeniallyCounterRepository {
    save(geniallyCounter: GeniallyCounter): Promise<void>;

    get(): Promise<GeniallyCounter>;
}