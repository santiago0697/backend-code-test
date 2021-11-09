import MongoDbClient from "../../shared/infrastructure/persistance/MongoDbClient";
import GeniallyCounter, { GeniallyCounterPrimitives } from "../domain/GeniallyCounter";
import GeniallyCounterRepository from "../domain/GeniallyCounterRepository";

export default class MongoDbGeniallyCounterRepository implements GeniallyCounterRepository {
    private collection = "GeniallyCounter";

    async save(geniallyCounter: GeniallyCounter): Promise<void> {
        const db = await new MongoDbClient().getDb();
        db.collection(this.collection).updateMany(
            {},
            { $set: geniallyCounter.toPrimitives() },
            { upsert: true }
        );
    }

    async get(): Promise<GeniallyCounter | undefined> {
        const db = await new MongoDbClient().getDb();
        const geniallyCounterPrimitives = await db.collection<GeniallyCounterPrimitives>(this.collection).findOne({});
        if (geniallyCounterPrimitives) {
            return GeniallyCounter.fromPrimitives(geniallyCounterPrimitives);
        }
        return undefined;
    }
}