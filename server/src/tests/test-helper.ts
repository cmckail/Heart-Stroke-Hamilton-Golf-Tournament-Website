import express from "express";
import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";
import { before } from "mocha";
import path from "path";
import * as dotenv from "dotenv";
try {
    dotenv.config({ path: path.resolve(process.cwd(), ".env.testing") });
} catch {}

import Application from "../app";
import UserRepository from "../repos/user-repo";
import { readFileSync } from "fs";

chai.use(chaiHttp);
chai.should();

let application: Application;
export let app: express.Application;
export let agent: ChaiHttp.Agent;

before(async () => {
    console.log(process.env.NODE_ENV);
    application = new Application();
    await application.startDbAndServer();
    app = application.app;
    agent = chai.request.agent(app);
    const userRepo = new UserRepository();
    await userRepo.addToDB(
        JSON.parse(readFileSync("src/assets/test-data/admin.json", "utf-8"))
    );
});
