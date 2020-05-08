import { RouterResponses } from "./RouterResponses";
import { Router } from "express";
import { validate } from "joi";
import { RouterValidator } from "../validators/validator";
import { CallbackClass } from "./RouterCallbackLogic";

export class MongoRouter {
  private router: Router;
  private routerResponses: RouterResponses;
  private routerValidator: RouterValidator;
  private routerCallback: CallbackClass;
  constructor() {
    this.router = Router();
    this.routerResponses = new RouterResponses();
    this.routerValidator = new RouterValidator();
    this.routerCallback = new CallbackClass();
  }
  prepareRouting(): Router {
    this.router.get("/id/:userId", (req, res) => {
      validate(
        req.params,
        this.routerValidator.getValidator("userId"),
        (err, value) => {
          err
            ? res.status(422).json(this.routerCallback.validationError(value))
            : this.routerResponses.getDataByLikes(
                Number(req.params.userId),
                res
              );
        }
      );
    });
    this.router.post("/addUser", (req, res) => {
      this.routerResponses.saveData(req.body, res);
    });
    return this.router;
  }
}
