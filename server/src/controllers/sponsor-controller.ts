import { Request, Response, NextFunction } from "express";
import Image from "@local/shared/models/image";
import Sponsor from "@local/shared/models/sponsor";
import ImageRepository from "../repos/image-repo";
import SponsorRepository from "../repos/sponsor-repo";
import ISponsorView from "@local/shared/view-models/sponsor";
import ImageController from "./image-controller";

const repo = new SponsorRepository();
const imageRepo = new ImageRepository();

export default class SponsorController {
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

    public static async search(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result = await repo.find({ where: req.query });
            const output = result.map((item) =>
                SponsorController.convertSponsorToView(item)
            );
            res.json(output);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    public static async register(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let logo = req.file;
            let body = { ...req.body } as Sponsor;

            if (logo) {
                let image: Image = {
                    data: logo.buffer,
                    mimetype: logo.mimetype,
                };

                if (logo.originalname && logo.originalname !== "") {
                    image.filename = logo.originalname;
                }

                const logoResult = (await imageRepo.addToDB(image)) as Image;
                body.logo = logoResult;
            }

            const result = body;

            // req.session.sponsor = result;

            // const result = await repo.addToDB(body);
            const output = SponsorController.convertSponsorToView(result);

            res.json(output);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

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
                let image: Image = {
                    data: logo.buffer,
                    mimetype: logo.mimetype,
                };

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
        let result: ISponsorView = { ...sponsor, logo: undefined };
        if (sponsor.logo) {
            result.logo = ImageController.getURL(sponsor.logo.publicId!);
        }
        return result;
    }
}
