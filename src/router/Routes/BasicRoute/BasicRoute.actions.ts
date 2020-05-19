import { MongoQueryHandler } from "../../../database/MongoQueryHandler";
import { Response } from "express";
import { Data } from "types/DataTypes";
import { BasicRouteResponses } from "./BasicRoute.responses";

export class BasicRouteActions {
  private mongoController: MongoQueryHandler;
  private responses: BasicRouteResponses;

  constructor() {
    this.mongoController = new MongoQueryHandler();
    this.responses = new BasicRouteResponses();
  }

  getDataByLikes(likes: number, res: Response<any>): void {
    let routingCallback = (data: Data) => {
      if (data) {
        res.status(200).json(this.responses.routingCallback(data));
      } else {
        res.status(200).json({ error: "No data according your request" });
      }
    };
    this.mongoController.getCollectionDataByArray(likes, routingCallback);
  }

  saveData(data: Data, res: Response<any>): void {
    let routingCallback = () => {
      res.status(200).json(this.responses.routingCallbackAdd());
    };
    this.mongoController.addNewPosition(data, routingCallback);
  }
}
