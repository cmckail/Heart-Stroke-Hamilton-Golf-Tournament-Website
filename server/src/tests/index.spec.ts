import chai from "chai";
import chaiHttp from "chai-http";
import { readFileSync } from "fs";
import UserRepository from "../repos/user-repo";
import { agent } from "./test-helper";

chai.use(chaiHttp);
chai.should();
const assert = chai.assert;

describe("Connection test", () => {
    it("should connect successfully", (done) => {
        agent.get("/api").end((err, res) => {
            if (err) {
                done(err);
            }
            assert.deepEqual(res.body.msg, "Connection successful.");
            done();
        });
    });
});
