import express from "express";

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
  }
  getApp(): express.Application {
    return this.app;
  }
}
