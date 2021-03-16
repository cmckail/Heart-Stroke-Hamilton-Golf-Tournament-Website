import chai from "chai";
import chaiHttp from "chai-http";
import { readFileSync } from "fs";

import { agent } from "./test-helper";

chai.use(chaiHttp);
chai.should();
const assert = chai.assert;

const logo = readFileSync("src/assets/test-data/logo.png");
let id = "";

describe("Sponsor POST test", () => {
    it("should add new sponsor successfully", (done) => {
        agent
            .post("/api/sponsors/add")
            .attach("logo", logo, "logo.png")
            .field("name", "test sponsor")
            .field("type", "gold")
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                assert.strictEqual(res.status, 200);
                assert.isNotNull(res.body.id);
                assert.isNotNull(res.body.logo);

                id = res.body.id;
                done();
            });
    });
});

describe("Sponsor GET test", () => {
    it("should retrieve sponsor successfully", (done) => {
        agent.get("/api/sponsors/" + id).end((err, res) => {
            if (err) {
                done(err);
            }

            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.name, "test sponsor");
            done();
        });
    });
});

describe("Sponsor UPDATE test", () => {
    it("should update sponsor succesfully", (done) => {
        agent
            .patch("/api/sponsors/update/" + id)
            .field("name", "test 2")
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                assert.strictEqual(res.status, 200);
                assert.strictEqual(res.body.name, "test 2");
                done();
            });
    });
});

describe("Sponsor DELETE test", () => {
    it("should delete sponsor successfully", (done) => {
        agent.delete("/api/sponsors/delete/" + id).end((err, res) => {
            if (err) {
                done(err);
            }

            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.rows, 1);

            done();
        });
    });
});
