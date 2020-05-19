import { Router } from "express";
import { CommonRouteRouter } from "./Routes/CommonRoute";
import { BasicRouteRouter } from "./Routes/BasicRoute";

export class MongoRouter {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  prepareRouting(): Router {
    this.router.use(new CommonRouteRouter().getRouting());
    this.router.use(new BasicRouteRouter().getRouting());
    return this.router;
  }
}
