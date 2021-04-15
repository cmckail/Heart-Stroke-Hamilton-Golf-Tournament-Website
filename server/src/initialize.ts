process.env.NODE_ENV = "sync";

import { createConnection } from "typeorm";
import { readdirSync, readFileSync } from "fs";

import connectionObj from "./config/db";
import ImageRepository from "./repos/image-repo";
import logger from "./utils/logger";
import UserRepository from "./repos/user-repo";
import SponsorRepository from "./repos/sponsor-repo";
import Image from "./models/image";
import PhotoRepository from "./repos/photo-repo";
import Photo from "./models/photo";

/**
 * Initializes DB
 */
createConnection(connectionObj).then(() => {
    // Images
    // const imageRepo = new ImageRepository();
    // const imageData = readFileSync("src/assets/test-data/dog.jpg");

    // imageRepo.addToDB(new Image(imageData, "image/jpeg", "dog.jpg"));

    // Users
    // const userRepo = new UserRepository();
    // const user = JSON.parse(
    //     readFileSync("src/assets/test-data/admin.json", "utf-8")
    // );
    // userRepo.addToDB(user);

    // Sponsors
    // const sponsorRepo = new SponsorRepository();
    // const sponsor = JSON.parse(
    //     readFileSync("src/assets/test-data/sponsor.json", "utf-8")
    // );
    // const logoData = readFileSync("src/assets/test-data/logo.png");

    // imageRepo
    //     .addToDB(new Image(logoData, "image/png", "logo.png"))
    //     .then((res) => {
    //         sponsor.logo = res;
    //         sponsorRepo.addToDB(sponsor);
    //     });

    // Photos
    const photoRepo = new PhotoRepository();

    const photos = readdirSync("src/assets/test-data/pictures");
    let data: Photo[] = [];
    photos.forEach((photo) => {
        let mimetype = photo.endsWith("png") ? "image/png" : "image/jpeg";
        let image = new Image({
            data: readFileSync(`src/assets/test-data/pictures/${photo}`),
            mimetype,
        });
        let item = new Photo({ image });
        data.push(item);
    });

    photoRepo.addToDB(data);

    logger.info(`DB initialized. Exiting...`);
});
