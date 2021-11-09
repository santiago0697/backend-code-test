import { injectable } from "inversify";
import Genially, { GeniallyPrimitives } from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import MongoDbClient from "../../shared/infrastructure/persistance/MongoDbClient";

@injectable()
export default class MongoDbGeniallyRepository implements GeniallyRepository {
    private collection = "genially";

    async save(genially: Genially): Promise<void> {
        const db = await new MongoDbClient().getDb();
        db.collection(this.collection).updateOne(
            { id: genially.id },
            { $set: genially.toPrimitives() },
            { upsert: true }
        );
    }

    async find(id: string): Promise<Genially | undefined> {
        const db = await new MongoDbClient().getDb();
        const geniallyFound = await db.collection(this.collection).findOne({ id })
        if (geniallyFound) {
            const geniallyPrimitives = {
                id: geniallyFound.id,
                name: geniallyFound.name,
                description: geniallyFound.description ?? undefined,
                createdAt: geniallyFound.createdAt ?? undefined,
                modifiedAt: geniallyFound.modifiedAt ?? undefined,
                deletedAt: geniallyFound.deletedAt ?? undefined,
            };

            return Genially.buildFromPrimitives(geniallyPrimitives);
        }
        return undefined;
    }

    async delete(genially: Genially): Promise<void> {
        await this.save(genially);
    }
}