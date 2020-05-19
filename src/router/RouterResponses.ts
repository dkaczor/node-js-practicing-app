import { MongoQueryHandler } from "../database/MongoQueryHandler";
import { Response } from "express";
import { Data } from "types/DataTypes";
import { CallbackClass } from "./RouterCallbackLogic";
import { TokenHandler } from "./TokenHandler";

export class RouterResponses {
  private mongoController: MongoQueryHandler;
  private callbackClasses: CallbackClass;

  constructor() {
    this.mongoController = new MongoQueryHandler();
    this.callbackClasses = new CallbackClass();
  }

  getDataByLikes(likes: number, res: Response<any>): void {
    let routingCallback = (data: Data) => {
      res.status(200).json(this.callbackClasses.routingCallback(data));
    };
    this.mongoController.getCollectionDataByArray(likes, routingCallback);
  }

  saveData(data: Data, res: Response<any>): void {
    let routingCallback = () => {
      res.status(200).json(this.callbackClasses.routingCallbackAdd());
    };
    this.mongoController.addNewPosition(data, routingCallback);
  }

  getToken(res: Response<any>, tokenHandler: TokenHandler, value: any): void {
    res.json({
      accessToken: tokenHandler.getToken(value, res),
    });
  }
}
