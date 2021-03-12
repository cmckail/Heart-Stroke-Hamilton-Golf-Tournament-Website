require("dotenv").config();
import express from "express";
import next from "next";

const port = 3000;
const isDevelopment = process.env.NODE_ENV !== "production";
const app = next({ dev: isDevelopment });
const handle = app.getRequestHandler();

const apiPaths = {
    "/api": {
        target: "http://localhost:5000",
        pathRewrite: {
            "^/api": "/api",
        },
        changeOrigin: true,
    },
};

// app.prepare().then(() => console.log("Running"));

app.prepare()
    .then(() => {
        const server = express();

        if (isDevelopment) {
            const { createProxyMiddleware } = require("http-proxy-middleware");
            server.use("/api", createProxyMiddleware(apiPaths["/api"]));
        }

        // server.get("/", (req, res) => handle(req, res));

        server.all("*", (req, res) => {
            handle(req, res);
        });

        server.listen(port, () => {
            console.log(`Started on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log("Error: ", err);
    });
