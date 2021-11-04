import { Response, Request } from "express";
import { inject, injectable } from "inversify";
import CreateGeniallyService from "../../../contexts/core/genially/application/CreateGeniallyService";

@injectable()
export default class GeniallyCreateController {
  constructor(@inject("CreateGeniallyService") private service: CreateGeniallyService) { }

  public async execute(req: Request, res: Response): Promise<void> {
    const createGeniallyRequest = req.body;
    try {
      await this.service.execute(createGeniallyRequest);
      res.status(201).send();
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
}