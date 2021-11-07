import { injectable } from "inversify";
import Genially, { GeniallyPrimitives } from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import MongoDbClient from "../../shared/infrastructure/persistance/MongoDbClient";

@injectable()
export default class MongoDbGeniallyRepository implements GeniallyRepository {
    private collection: string = "genially";

    async save(genially: Genially): Promise<void> {
        const db = await new MongoDbClient().getDb();
        db.collection(this.collection).updateOne(
            { id: genially.id },
            { $set: genially.toPrimitives() },
            { upsert: true }
        );
    }

    async find(id: string): Promise<Genially> {
        const db = await new MongoDbClient().getDb();
        const data = await db.collection(this.collection).findOne({ id })
        if (data) {
            const geniallyPrimitives: GeniallyPrimitives = {
                id: data.id,
                name: data.name,
                description: data.description ?? undefined,
                createdAt: data.createdAt ?? undefined,
                modifiedAt: data.modifiedAt ?? undefined,
                deletedAt: data.deletedAt ?? undefined,
            };

            return Genially.buildFromPrimitives(geniallyPrimitives);
        }
        return undefined;
    }

    async delete(genially: Genially): Promise<void> {
        await this.save(genially);
    }
}