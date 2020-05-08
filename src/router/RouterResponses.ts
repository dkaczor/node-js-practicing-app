import { MongoQueryHandler } from "../db/MongoQueryHandler";
import { Request, Response } from "express";
import { ParamsDictionary, Query } from "express-serve-static-core";
import { Data } from "../types/DataTypes";
import { CallbackClass } from "./RouterCallbackLogic";

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
    let routingCallback = (data: Data) => {
      res.status(200).json(this.callbackClasses.routingCallbackAdd());
    };
    this.mongoController.addNewPosition(data, routingCallback);
  }
}
