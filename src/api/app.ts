import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";

// Controllers (route handlers)
import * as healthController from "./controllers/health";
import GeniallyCreateController from "./controllers/genially/GeniallyCreateController";
import GeniallyDeleteController from "./controllers/genially/GeniallyDeleteController";
import GeniallyRenameController from "./controllers/genially/GeniallyRenameController";
import { inversifyContainer } from "../contexts/core/shared/infrastructure/Container/InversifyContainer";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

const container = inversifyContainer();
const geniallyCreateController = container.get<GeniallyCreateController>(GeniallyCreateController.name);
const geniallyDeleteController = container.get<GeniallyDeleteController>(GeniallyDeleteController.name);
const geniallyRenameController = container.get<GeniallyRenameController>(GeniallyRenameController.name);

// Primary app routes
app.get("/", healthController.check);
app.post("/genially", geniallyCreateController.execute.bind(geniallyCreateController));
app.delete("/genially/:id", geniallyDeleteController.execute.bind(geniallyDeleteController));
app.put("/genially/:id", geniallyRenameController.execute.bind(geniallyRenameController));

export default app;
