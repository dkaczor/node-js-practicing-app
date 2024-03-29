import express from "express";
import cors from "cors";

export class MongoApplication {
  private app: express.Application;
  constructor() {
    this.app = express();
  }
  applyRouting(routing: express.Router): void {
    this.app.use(routing);
    console.log("ROUTING PREPARED");
  }
  applyPostBodyUsage(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }
  getApp(): express.Application {
    return this.app;
  }
  listen(): void {
    this.getApp().listen(3000, () =>
      console.log("Listening for connections...")
    );
  }
}
