import { Response, Request } from "express";
import DeleteGeniallyService from "../../../contexts/core/genially/application/DeleteGeniallyService";
import InMemoryGeniallyRepository from "../../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import { inject, injectable } from "inversify";

const service = new DeleteGeniallyService(new InMemoryGeniallyRepository());

@injectable()
export default class GeniallyDeleteController {
    constructor(@inject("DeleteGeniallyService") private service: DeleteGeniallyService) { }

    public async execute(req: Request, res: Response): Promise<void> {
        const geniallyId = req.params.id;
        try {
            await service.execute(geniallyId);
            res.status(204).send()
        } catch (err) {
            res.status(404).send({ error: err.message });
        }
    }
}