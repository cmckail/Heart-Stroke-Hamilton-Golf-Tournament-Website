import { Request, Response, NextFunction } from "express";
import Image from "../models/image";
import Sponsor from "../models/sponsor";
import ImageRepository from "../repos/image-repo";
import SponsorRepository from "../repos/sponsor-repo";
import ISponsorView from "@local/shared/view-models/sponsor";
import ImageController from "./image-controller";
import addToSession from "../utils/session";
import IImageView from "@local/shared/view-models/image";

const repo = new SponsorRepository();
const imageRepo = new ImageRepository();

/**
 * Sponsor controller
 */
export default class SponsorController {
    /**
     * Retrieves all sponsors or optionally by ID
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    public static async getAllOrByID(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let output;
            if (!req.params.id) {
                const result = await repo.find({});

                output = result.map((item) =>
                    SponsorController.convertSponsorToView(item)
                );
            } else {
                const result = await repo.findByID(req.params.id);
                output = SponsorController.convertSponsorToView(result);
            }

            res.json(output);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    /**
     * Searches for specific sponsor
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    // public static async search(
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ) {
    //     try {
    //         const result = await repo.find({ where: req.query });
    //         const output = result.map((item) => {
    //             let data: ISponsorView = {
    //                 name: item.name,
    //                 description: item.description,
    //                 url: item.url,
    //             };

    //             if (item.logo) {
    //                 data.logoURL = ImageController.getURL(item.logo.id);
    //             }

    //             return data;
    //         });
    //         res.json(output);
    //     } catch (e) {
    //         console.error(e);
    //         next(e);
    //     }
    // }

    /**
     * Registers a specific sponsor
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    public static async register(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let logo = req.file;
            let sponsor = req.body as ISponsorView;

            if (logo) {
                let imageView: IImageView = {
                    data: logo.buffer,
                    mimetype: logo.mimetype,
                };

                if (logo.originalname && logo.originalname !== "") {
                    imageView.filename = logo.originalname;
                }

                sponsor.logoData = imageView;
            }

            addToSession(req, sponsor);
            res.sendStatus(200).send("Item added to session.");
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    /**
     * Updates a specific sponsor
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    public static async update(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let logo = req.file;

            // Destructuring needed as the regular object is considered a null object
            let body = { ...req.body };
            let deleteLogo = !!body.deleteLogo;

            // Add new logo to DB if exists
            if (logo) {
                let image = new Image(logo.buffer, logo.mimetype);

                if (logo.originalname && logo.originalname !== "") {
                    image.filename = logo.originalname;
                }

                const newLogoResult = (await imageRepo.addToDB(image)) as Image;
                body.logo = newLogoResult;
            }

            if (deleteLogo) {
                body.logo = null;
                delete body.deleteLogo;
            }

            let originalSponsor = await repo.findByID(req.params.id);

            const resp = await repo.update(req.params.id, body);

            // Deletes original logo from DB if exists
            if ((logo || deleteLogo) && originalSponsor.logo) {
                await imageRepo.delete(originalSponsor.logo.id!);
            }

            res.json(SponsorController.convertSponsorToView(resp));
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    /**
     * Deletes a specific sponsor
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    public static async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let originalSponsor = await repo.findByID(req.params.id);

            const result = await repo.delete(req.params.id);

            if (originalSponsor.logo) {
                await imageRepo.delete(originalSponsor.logo!.id!);
            }

            res.json({ rows: result });
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    /**
     * Converts a sponsor object to a JSON friendly output
     * @param sponsor sponsor item to convert
     */
    private static convertSponsorToView(sponsor: Sponsor) {
        let data: ISponsorView = {
            name: sponsor.name,
            description: sponsor.description,
            url: sponsor.url,
        };

        if (sponsor.logo) {
            data.logoURL = ImageController.getURL(sponsor.logo.id);
        }

        return data;
    }
}
