import { Response } from "express";
import { CommonRouteResponses } from "./CommonRoute.responses";
import { TokenHandler } from "../../../tokens/TokenHandler";
import { userNotFound } from "../../../router/RouterErrors/TokenErrors";
import { RouteActions } from "../../../router/Classes/RouteActions.class";

export class CommonRouteActions extends RouteActions {
  private responses: CommonRouteResponses;
  constructor() {
    super();
    this.responses = new CommonRouteResponses();
  }

  getToken(res: Response<any>, tokenHandler: TokenHandler, value: any): void {
    const result = tokenHandler.getToken(value, res);
    if (!result) {
      res.status(422).json(this.responses.validationError(userNotFound));
    } else {
      res.json({
        accessToken: tokenHandler.getToken(value, res),
      });
    }
  }
}
