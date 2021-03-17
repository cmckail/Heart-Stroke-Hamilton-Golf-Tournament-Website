import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import express from "express";
import expressSession from "express-session";
import { createConnection } from "typeorm";

import { env, port, connectionObj, logger } from "./config";
import { TypeormStore } from "connect-typeorm/out";
import Session from "./models/session";

export default class Application {
    app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
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
            } Connection: ${connection.options.database}`
        );

        // Setup session
        this.app.use(
            expressSession({
                secret: "asdf",
                resave: false,
                saveUninitialized: false,
                store: new TypeormStore({
                    cleanupLimit: 2,
                    limitSubquery: true,
                    ttl: 86400,
                }).connect(connection.getRepository(Session)),
            })
        );

        const { router, apiRouter } = require("./routes"); // MUST COME AFTER createConnection()
        this.app.use("/", router);
        this.app.use("/api", apiRouter); // MUST COME AFTER require("./routes")

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
