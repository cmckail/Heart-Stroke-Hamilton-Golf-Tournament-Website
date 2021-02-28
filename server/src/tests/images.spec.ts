import chai from "chai";
import chaiHttp from "chai-http";
import { readFileSync } from "fs";

import { agent } from "./test-helper";

chai.use(chaiHttp);
chai.should();
const assert = chai.assert;

const jpg = readFileSync("src/assets/test-data/dog.jpg");
const tiff = readFileSync("src/tests/assets/dog.tiff");

let id = "";
let publicId = "";

describe("Image POST test", () => {
    it("should POST JPG successfully", (done) => {
        agent
            .post("/api/images/upload")
            .attach("photo", jpg, "dog.jpg")
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                let result = res.body[0];

                assert.strictEqual(res.status, 200);

                assert.isNotNull(result.id);
                assert.isNotNull(result.publicId);

                id = result.id;
                publicId = result.publicId;
                done();
            });
    });
});

describe("Image GET test", () => {
    it("should retrieve JPG successfully", (done) => {
        agent.get(`/api/images/${publicId}`).end((err, res) => {
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
        agent
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
        agent.delete("/api/images/delete/" + id).end((err, res) => {
            if (err) {
                done(err);
            }
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.rows, 1);

            done();
        });
    });
});
