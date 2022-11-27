import express from "express";
import homepageController from "../controllers/homepageController";

let router = express.Router();

let initWebRoutes = (app)=> {
    router.get("/", homepageController.getHomePage);
    router.post("/webhook", homepageController.postWebhook);
    router.get("/webhook", homepageController.getWebhook);

    return app.use("/", router);
};

module.exports = initWebRoutes;
