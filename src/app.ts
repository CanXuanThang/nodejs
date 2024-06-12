import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
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
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader("Access-Control-Allow-Origin", "https://localhost:8080");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      next();
    });

    this.app.use(cors({ origin: "https://localhost:8080", credentials: true }));
    this.app.use(json({ limit: "50mb" }));
    this.app.use(urlencoded({ extended: true, limit: "50mb" }));

    this.app.use("/api", routers);
    this.app.use(errorMiddleware);
  }
}

export default new App().app;
