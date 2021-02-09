process.env.NODE_ENV = "development";
process.env.SYNC_DB = "true";

import { createConnection } from "typeorm";
import connectionObj from "./config/db";
import logger from "./utils/logger";

createConnection(connectionObj).then((connection) => {
    logger.info(`DB resynced. Restarting...`);
});
