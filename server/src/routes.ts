import express from "express";
import imageRouter from "./controllers/imageController";
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ msg: "Connection successful." });
});

router.use("/images", imageRouter);

module.exports = router;
