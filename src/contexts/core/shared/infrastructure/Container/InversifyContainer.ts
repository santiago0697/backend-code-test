import { Container } from "inversify";
import CreateGeniallyService from "../../../genially/application/CreateGeniallyService";
import GeniallyCreateController from "../../../../../api/controllers/genially/GeniallyCreateController";
import GeniallyDeleteController from "../../../../../api/controllers/genially/GeniallyDeleteController";
import DeleteGeniallyService from "../../../genially/application/DeleteGeniallyService";
import GeniallyRenameController from "../../../../../api/controllers/genially/GeniallyRenameController";
import RenameGeniallyService from "../../../genially/application/RenameGeniallyService";
import MongoDbGeniallyRepository from "../../../genially/infrastructure/MongoDbGeniallyRepository";
import InMemoryEventBus from "../bus/InMemoryEventBus";
import GeniallyIncreaseCounter from "../../../../../contexts/core/geniallyCounter/application/GeniallyIncreaseCounter";
import MongoDbGeniallyCounterRepository from "../../../../../contexts/core/geniallyCounter/infrastructure/MongoDbGeniallyCounterRepository";
import IncreaseCounterOnGeniallyCreated from "../../../../../contexts/core/geniallyCounter/application/IncreaseCounterOnGeniallyCreated";

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
    container.bind(GeniallyIncreaseCounter.name).to(GeniallyIncreaseCounter).inRequestScope();
    container.bind("EventBus").to(InMemoryEventBus).inSingletonScope();

    // Event handlers
    container.bind("EventHandler").to(IncreaseCounterOnGeniallyCreated);

    //Repositories
    //container.bind("GeniallyRepository").to(InMemoryGeniallyRepository).inRequestScope();
    container.bind("GeniallyRepository").to(MongoDbGeniallyRepository).inRequestScope();
    container.bind("GeniallyCounterRepository").to(MongoDbGeniallyCounterRepository).inRequestScope();

    return container;
};