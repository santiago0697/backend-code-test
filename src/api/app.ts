import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";

// Controllers (route handlers)
import * as healthController from "./controllers/health";
import GeniallyCreateController from "./controllers/genially/GeniallyCreateController";
import GeniallyDeleteController from "./controllers/genially/GeniallyDeleteController";
import GeniallyRenameController from "./controllers/genially/GeniallyRenameController";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Primary app routes
app.get("/", healthController.check);
app.post("/genially", GeniallyCreateController);
app.delete("/genially/:id", GeniallyDeleteController);
app.put("/genially/:id", GeniallyRenameController);

export default app;
