import app from "./src/app";
import { config } from "dotenv";
config();

import { envConfig } from "./src/config/config";
import "./src/database/connection";

function startServer() {
  const port = envConfig.portNumber;
  app.listen(port, () => {
    console.log(`project has started at ${port}`);
  });
}

startServer();
