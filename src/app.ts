import cors from "cors";
import express from "express";
import routers from "./routers";
import { errorMiddleware } from "./middlewares/error.middleware";
import { json, urlencoded } from "body-parser";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    this.app.use(cors());
    this.app.use(json({ limit: "50mb" }));
    this.app.use(urlencoded({ extended: true, limit: "50mb" }));

    this.app.use((req: any, res: any, next: any) => {
      res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-Wuth, content-type"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      next();
    });

    this.app.use("/", routers);
    this.app.use(errorMiddleware);
  }
}

export default new App().app;
