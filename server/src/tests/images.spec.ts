import chai from "chai";
import chaiHttp from "chai-http";
import { readFileSync } from "fs";

import { app } from "./test-helper";

chai.use(chaiHttp);
chai.should();
const assert = chai.assert;

const jpg = readFileSync("src/assets/test-data/dog.jpg");
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
                let result = res.body[0];

                assert.strictEqual(res.status, 200);

                assert.match(
                    result.url,
                    /^http:\/\/localhost:5000\/api\/images\/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/g
                );

                id = (result.url as string).match(
                    /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/g
                )![0];
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

describe("Image DELETE test", () => {
    it("should delete the image", (done) => {
        chai.request(app)
            .delete("/api/images/delete/" + id)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                assert.strictEqual(res.status, 200);
                assert.strictEqual(res.body.rows, 1);

                done();
            });
    });
});
