process.env.NODE_ENV = "sync";

import { createConnection, getConnection } from "typeorm";
import { readFileSync } from "fs";

import connectionObj from "./config/db";
import ImageRepository from "./repos/image-repo";
import logger from "./utils/logger";
import UserRepository from "./repos/user-repo";
import SponsorRepository from "./repos/sponsor-repo";
import Image from "./models/image";
createConnection(connectionObj).then((connection) => {
    // Images
    const imageRepo = new ImageRepository();
    const imageData = readFileSync("src/assets/test-data/dog.jpg");

    imageRepo.addToDB(new Image(imageData, "image/jpeg", "dog.jpg"));

    // Users
    const userRepo = new UserRepository();
    const user = JSON.parse(
        readFileSync("src/assets/test-data/admin.json", "utf-8")
    );
    userRepo.addToDB(user);

    // Sponsors
    const sponsorRepo = new SponsorRepository();
    const sponsor = JSON.parse(
        readFileSync("src/assets/test-data/sponsor.json", "utf-8")
    );
    const logoData = readFileSync("src/assets/test-data/logo.png");

    imageRepo
        .addToDB(new Image(logoData, "image/png", "logo.png"))
        .then((res) => {
            sponsor.logo = res;
            sponsorRepo.addToDB(sponsor);
        });

    logger.info(`DB initialized. Exiting...`);
});
