import { CommonRouteActions } from "./CommonRoute.actions";
import { Router } from "express";
import { validate } from "joi";
import { CommonRouterValidator } from "./CommonRoute.validator";
import { CommonRouteResponses } from "./CommonRoute.responses";
import { TokenHandler } from "../../../router/TokenHandler";

export class CommonRouteRouter {
  private router: Router;
  private actions: CommonRouteActions;
  private routerValidator: CommonRouterValidator;
  private responses: CommonRouteResponses;
  private tokenHandler: TokenHandler;
  constructor() {
    this.router = Router();
    this.actions = new CommonRouteActions();
    this.routerValidator = new CommonRouterValidator();
    this.responses = new CommonRouteResponses();
    this.tokenHandler = new TokenHandler();
  }
  getRouting(): Router {
    this.router.post("/getToken", (req, res) => {
      validate(
        req.body,
        this.routerValidator.validateRequestForToken(),
        (err, value) => {
          if (err) {
            return res.status(422).json(this.responses.validationError(value));
          }
          this.actions.getToken(res, this.tokenHandler, value);
        }
      );
    });
    return this.router;
  }
}
