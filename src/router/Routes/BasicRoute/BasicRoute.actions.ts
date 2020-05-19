import { Response } from "express";
import { Data } from "types/DataTypes";
import { BasicRouteResponses } from "./BasicRoute.responses";
import { RouteActions } from "../../../router/Classes/RouteActions.class";

export class BasicRouteActions extends RouteActions {
  private responses: BasicRouteResponses;
  constructor() {
    super();
    this.responses = new BasicRouteResponses();
  }

  getDataById(userId: number, res: Response<any>): void {
    let routingCallback = (data: Data) => {
      if (data) {
        res.status(200).json(this.responses.routingCallback(data));
      } else {
        res.status(200).json(this.responses.noData());
      }
    };
    this.mongoController.getCollectionDataByArray(userId, routingCallback);
  }

  saveData(data: Data, res: Response<any>): void {
    let routingCallback = () => {
      res.status(200).json(this.responses.routingCallbackAdd());
    };
    this.mongoController.addNewPosition(data, routingCallback);
  }
}
