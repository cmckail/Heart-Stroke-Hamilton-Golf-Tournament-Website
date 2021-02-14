process.env.NODE_ENV = "sync";

import { createConnection } from "typeorm";
import { readFileSync } from "fs";

import connectionObj from "./config/db";
import ImageRepository from "./repos/image-repo";
import logger from "./utils/logger";
import UserRepository from "./repos/user-repo";

createConnection(connectionObj).then((connection) => {
    const imageRepo = new ImageRepository();

    const imageData = readFileSync("src/assets/test-data/dog.jpg");

    imageRepo.addToDB({
        data: imageData,
        filename: "dog.jpg",
        mimetype: "image/jpeg",
    });

    const userRepo = new UserRepository();
    const user = JSON.parse(
        readFileSync("src/assets/test-data/admin.json", "utf-8")
    );

    userRepo.addToDB(user);

    logger.info(`DB initialized. Restarting...`);
});
