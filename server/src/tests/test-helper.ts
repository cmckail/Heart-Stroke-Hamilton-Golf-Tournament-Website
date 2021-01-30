import Application from "../app";
import express from "express";
import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";
import { before } from "mocha";

chai.use(chaiHttp);
chai.should();

let application: Application;
export let app: express.Application;

before(async () => {
    application = new Application();
    await application.startDbAndServer();
    app = application.app;
});
