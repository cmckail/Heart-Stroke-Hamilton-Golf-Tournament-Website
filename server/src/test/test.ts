import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";

chai.use(chaiHttp);
chai.should();
const assert = chai.assert;

describe("Hello World test", () => {
    it("should get hello world", (done) => {
        chai.request(app)
            .get("/")
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                assert.deepEqual(res.body.msg, "Hello World!");
                done();
            });
    });
});
