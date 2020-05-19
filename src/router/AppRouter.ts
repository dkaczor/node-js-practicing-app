import { RouterResponses } from "./RouterResponses";
import { Router } from "express";
import { validate } from "joi";
import { RouterValidator } from "../validators/validator";
import { CallbackClass } from "./RouterCallbackLogic";
import { ParamsWithUser } from "types/DataTypes";
import { TokenHandler } from "./TokenHandler";

export class MongoRouter {
  private router: Router;
  private routerResponses: RouterResponses;
  private routerValidator: RouterValidator;
  private routerCallback: CallbackClass;
  private tokenHandler: TokenHandler;
  constructor() {
    this.router = Router();
    this.routerResponses = new RouterResponses();
    this.routerValidator = new RouterValidator();
    this.routerCallback = new CallbackClass();
    this.tokenHandler = new TokenHandler();
  }
  prepareRouting(): Router {
    this.router.get(
      "/id/:userId",
      this.tokenHandler.authenticateJWT,
      (req, res) => {
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
      }
    );

    this.router.post("/getToken", (req, res) => {
      console.log(req.body);
      validate(
        req.body,
        this.routerValidator.validateRequestForToken(),
        (err, value) => {
          if (err) {
            return res
              .status(422)
              .json(this.routerCallback.validationError(value));
          }
          this.routerResponses.getToken(res, this.tokenHandler, value);
        }
      );
    });

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
                .json(this.routerCallback.validationError(value));
            }
            this.routerResponses.saveData(req.body, res);
          }
        );
      }
    );
    return this.router;
  }
}
