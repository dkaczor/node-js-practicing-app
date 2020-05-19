import { BasicRouteActions } from "./BasicRoute.actions";
import { Router } from "express";
import { validate } from "joi";
import { BasicRouteValidator } from "./BasicRoute.validator";
import { BasicRouteResponses } from "./BasicRoute.responses";
import { ParamsWithUser } from "types/DataTypes";
import { RouterClass } from "../../../router/Classes/Route.class";

export class BasicRouteRouter extends RouterClass {
  private actions: BasicRouteActions;
  private routerValidator: BasicRouteValidator;
  private responses: BasicRouteResponses;
  constructor() {
    super();
    this.actions = new BasicRouteActions();
    this.routerValidator = new BasicRouteValidator();
    this.responses = new BasicRouteResponses();
  }
  getRouting(): Router {
    this.router.get(
      "/id/:userId",
      this.tokenHandler.authenticateJWT,
      (req, res) => {
        validate(
          req.params,
          this.routerValidator.getValidator("userId"),
          (err, value) => {
            err
              ? res.status(422).json(this.responses.validationError(value))
              : this.actions.getDataById(Number(req.params.userId), res);
          }
        );
      }
    );

    this.router.post(
      "/addUser",
      this.tokenHandler.authenticateJWT,
      (req: ParamsWithUser, res) => {
        validate(
          req.body,
          this.routerValidator.validateAddUser(),
          (err, value) => {
            if (err) {
              return res
                .status(422)
                .json(this.responses.validationError(value));
            }
            this.actions.saveData(req.body, res);
          }
        );
      }
    );
    return this.router;
  }
}
