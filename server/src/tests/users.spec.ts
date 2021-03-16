import chai from "chai";
import chaiHttp from "chai-http";
import { agent } from "./test-helper";

chai.use(chaiHttp);
chai.should();
const assert = chai.assert;

describe("Login test", () => {
    it("should login successfully", (done) => {
        agent
            .post("/api/users/login")
            .send({ email: "test@test.com", password: "testing" })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                assert.strictEqual(res.status, 200);
                done();
            });
    });
});
