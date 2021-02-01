import chai from "chai";
import chaiHttp from "chai-http";
import { readFileSync } from "fs";

import Image from "../models/image";
import { app } from "./test-helper";

chai.use(chaiHttp);
chai.should();
const assert = chai.assert;

const jpg = readFileSync("src/tests/assets/dog.jpg");
const tiff = readFileSync("src/tests/assets/dog.tiff");

let id = "";

describe("Image POST test", () => {
    it("should POST JPG successfully", (done) => {
        chai.request(app)
            .post("/api/images/upload")
            .attach("photo", jpg, "dog.jpg")
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                let result = res.body as Image;

                assert.strictEqual(res.status, 200);
                assert.strictEqual(result.mimetype, "image/jpeg");
                assert.strictEqual(result.filename, "dog.jpg");

                id = result.id!;
                done();
            });
    });
});

describe("Image GET test", () => {
    it("should retrieve JPG successfully", (done) => {
        chai.request(app)
            .get(`/api/images/${id}`)
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                assert.strictEqual(res.status, 200);
                assert.isOk(Buffer.isBuffer(res.body));

                done();
            });
    });
});

describe("Invalid type Image POST test", () => {
    it("should return 400", (done) => {
        chai.request(app)
            .post("/api/images/upload")
            .attach("photo", tiff, "dog.tiff")
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                assert.strictEqual(res.status, 400);
                done();
            });
    });
});
