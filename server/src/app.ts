import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import express from "express";
import { createConnection } from "typeorm";

import { env, port, connectionObj, logger } from "./config";

export default class Application {
    app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(helmet());
    }

    /**
     * Connects to DB and starts express server.
     */
    startDbAndServer = async () => {
        const connection = await createConnection(connectionObj);
        logger.info(
            `Connected to DB. ${
                env === "development"
                    ? `Sync DB: ${!!process.env.SYNC_DB} / `
                    : ""
            } Connection: ${connection.name} / ${connection.options.database}`
        );
        const router = require("./routes"); // MUST COME AFTER createConnection()
        this.app.use("/api", router); // MUST COME AFTER require("./routes")

        await this.startServer();
    };

    /**
     * Starts express server
     */
    private startServer(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                logger.info("App started on port " + port);
                resolve(true);
            });
        });
    }
}
