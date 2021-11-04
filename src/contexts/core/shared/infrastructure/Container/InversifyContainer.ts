import { Container } from "inversify";
import InMemoryGeniallyRepository from "../../../../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import CreateGeniallyService from "../../../../../contexts/core/genially/application/CreateGeniallyService";
import GeniallyCreateController from "../../../../../api/controllers/genially/GeniallyCreateController";
import GeniallyDeleteController from "../../../../../api/controllers/genially/GeniallyDeleteController";
import DeleteGeniallyService from "../../../../../contexts/core/genially/application/DeleteGeniallyService";
import GeniallyRenameController from "../../../../../api/controllers/genially/GeniallyRenameController";
import RenameGeniallyService from "../../../../../contexts/core/genially/application/RenameGeniallyService";

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
    container.bind("GeniallyRepository").to(InMemoryGeniallyRepository).inRequestScope();

    return container;
};