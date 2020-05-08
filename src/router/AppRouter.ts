import { RouterResponses } from "./RouterResponses";
import { Router } from "express";

export class MongoRouter {
  private router: Router;
  private routerResponses: RouterResponses;
  constructor() {
    this.router = Router();
    this.routerResponses = new RouterResponses();
  }
  prepareRouting(): Router {
    this.router.get("/id/:userId", (req, res) => {
      this.routerResponses.getDataByLikes(Number(req.params.userId), res);
    });
    this.router.post("/addUser", (req, res) => {
      this.routerResponses.saveData(req.body, res);
    });
    return this.router;
  }
}
