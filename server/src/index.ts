import * as dotenv from "dotenv";
dotenv.config();

import Application from "./app";

new Application().startDbAndServer();
