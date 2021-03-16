import { Router } from "express";
import multer from "multer";
import verifyUser from "../../middlewares/verify-user";
import Image from "@local/shared/models/image";
import Sponsor from "@local/shared/models/sponsor";
import ImageRepository from "../../repos/image-repo";
import SponsorRepository from "../../repos/sponsor-repo";

const upload = multer().single("logo");

const sponsorRouter = Router();
const repo = new SponsorRepository();
const imageRepo = new ImageRepository();

interface ISponsorResponse {
    id?: string;
    name?: string;
    type?: string;
    logo?: string | Image;
    createdAt?: Date;
}

/**
 * Converts a sponsor object to a JSON friendly output
 * @param sponsor sponsor item to convert
 * @param publicMode whether to return a public or private (authenticated) output
 */
const convertSponsorToResponse = (
    sponsor: Sponsor,
    publicMode: boolean = false
) => {
    let result: ISponsorResponse = sponsor;
    if (sponsor.logo) {
        result.logo = publicMode ? sponsor.logo.publicId : sponsor.logo.id;
    }
    if (publicMode) {
        result.id = undefined;
        result.createdAt = undefined;
    }
    return result;
};

sponsorRouter.get("/search", verifyUser, async (req, res, next) => {
    try {
        const result = await repo.find({ where: req.query });
        const output = result.map((item) => convertSponsorToResponse(item));
        res.json(output);
    } catch (e) {
        next(e);
    }
});

sponsorRouter.post("/add", upload, verifyUser, async (req, res, next) => {
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

        const result = await repo.addToDB(body);
        const output = convertSponsorToResponse(result);

        res.json(output);
    } catch (e) {
        next(e);
    }
});

sponsorRouter.patch(
    "/update/:id",
    upload,
    verifyUser,
    async (req, res, next) => {
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

            res.json(convertSponsorToResponse(resp));
        } catch (e) {
            next(e);
        }
    }
);

sponsorRouter.delete("/delete/:id", verifyUser, async (req, res, next) => {
    try {
        let originalSponsor = await repo.findByID(req.params.id);

        const result = await repo.delete(req.params.id);

        if (originalSponsor.logo) {
            await imageRepo.delete(originalSponsor.logo!.id!);
        }

        res.json({ rows: result });
    } catch (e) {
        next(e);
    }
});

sponsorRouter.get("/:id?", async (req, res, next) => {
    try {
        let output;
        if (!req.params.id) {
            const result = await repo.find({});

            output = result.map((item) => convertSponsorToResponse(item, true));
        } else {
            const result = await repo.findByID(req.params.id);
            output = convertSponsorToResponse(result, true);
        }

        res.json(output);
    } catch (e) {
        next(e);
    }
});

export default sponsorRouter;
