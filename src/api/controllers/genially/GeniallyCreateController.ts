import { Response, Request } from "express";
import CreateGeniallyService from "../../../contexts/core/genially/application/CreateGeniallyService";
import InMemoryGeniallyRepository from "../../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

const service = new CreateGeniallyService(new InMemoryGeniallyRepository());

export default async (req: Request, res: Response) => {
  const createGeniallyRequest = req.body;
  try {
    await service.execute(createGeniallyRequest);
    res.status(200).send();
  } catch (err) {
    res.status(400).send({error: err.message});
  }
};