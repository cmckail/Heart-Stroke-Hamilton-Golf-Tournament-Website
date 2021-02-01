import { doesNotMatch } from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "./test-helper";

chai.use(chaiHttp);
chai.should();
const assert = chai.assert;

describe("Connection test", () => {
    it("should connect successfully", (done) => {
        chai.request(app)
            .get("/api")
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                assert.deepEqual(res.body.msg, "Connection successful.");
                done();
            });
    });
});
