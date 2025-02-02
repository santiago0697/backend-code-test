import { Response, Request } from "express";
import GeniallyNotExist from "../../../contexts/core/genially/domain/Exception/GeniallyNotExist";
import RenameGeniallyService from "../../../contexts/core/genially/application/RenameGeniallyService";
import GeniallyNameInvalidLength from "../../../contexts/core/genially/domain/Exception/GeniallyNameInvalidLength";
import { inject, injectable } from "inversify";

@injectable()
export default class GeniallyRenameController {
    constructor(@inject("RenameGeniallyService") private service: RenameGeniallyService) { }

    public async execute(req: Request, res: Response) {
        const geniallyId = req.params.id;
        const newName = req.body.name;

        try {
            await this.service.execute(geniallyId, newName);
            res.status(204).send();
        } catch (error) {
            switch (error.constructor) {
                case GeniallyNotExist:
                    res.status(404).send();
                    break;
                case GeniallyNameInvalidLength:
                    res.status(400).send({ error: error.message });
                    break;
                default:
                    console.error(error)
                    res.status(500).send();
            }
        }
    }
}