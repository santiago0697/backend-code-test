import { Container } from "inversify";
import CreateGeniallyService from "../../../genially/application/CreateGeniallyService";
import GeniallyCreateController from "../../../../../api/controllers/genially/GeniallyCreateController";
import GeniallyDeleteController from "../../../../../api/controllers/genially/GeniallyDeleteController";
import DeleteGeniallyService from "../../../genially/application/DeleteGeniallyService";
import GeniallyRenameController from "../../../../../api/controllers/genially/GeniallyRenameController";
import RenameGeniallyService from "../../../genially/application/RenameGeniallyService";
import MongoDbGeniallyRepository from "../../../genially/infrastructure/MongoDbGeniallyRepository";

export const inversifyContainer = (): Container => {
    const container = new Container();
    // Controllers 
    container.bind(GeniallyCreateController.name).to(GeniallyCreateController).inRequestScope();
    container.bind(GeniallyDeleteController.name).to(GeniallyDeleteController).inRequestScope();
    container.bind(GeniallyRenameController.name).to(GeniallyRenameController).inRequestScope();

    // Services
    container.bind(CreateGeniallyService.name).to(CreateGeniallyService).inRequestScope();
    container.bind(DeleteGeniallyService.name).to(DeleteGeniallyService).inRequestScope();
    container.bind(RenameGeniallyService.name).to(RenameGeniallyService).inRequestScope();

    //Repositories
    //container.bind("GeniallyRepository").to(InMemoryGeniallyRepository).inRequestScope();
    container.bind("GeniallyRepository").to(MongoDbGeniallyRepository).inRequestScope();

    return container;
};