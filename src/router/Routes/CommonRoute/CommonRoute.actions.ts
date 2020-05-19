import { MongoQueryHandler } from "../../../database/MongoQueryHandler";
import { Response } from "express";
import { CommonRouteResponses } from "./CommonRoute.responses";
import { TokenHandler } from "../../../router/TokenHandler";
import { userNotFound } from "../../../router/RouterErrors/TokenErrors";

export class CommonRouteActions {
  private mongoController: MongoQueryHandler;
  private responses: CommonRouteResponses;

  constructor() {
    this.mongoController = new MongoQueryHandler();
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
