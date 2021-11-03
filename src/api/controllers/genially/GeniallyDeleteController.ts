import { Response, Request } from "express";
import DeleteGeniallyService from "../../../contexts/core/genially/application/DeleteGeniallyService";
import InMemoryGeniallyRepository from "../../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

const service = new DeleteGeniallyService(new InMemoryGeniallyRepository());

export default async (req: Request, res: Response) => {
    const geniallyId = req.params.id;
    try {
        await service.execute(geniallyId);
        res.status(204).send()
    } catch (err) {
        res.status(404).send({ error: err.message });
    }
}