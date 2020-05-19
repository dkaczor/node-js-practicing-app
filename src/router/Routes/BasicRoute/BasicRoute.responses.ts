import { Data } from "types/DataTypes";
import { noFetchedData, addedData } from "./BasicRoute.statuses";
import { RouteResponses } from "../RouteResponses.class";

export class BasicRouteResponses extends RouteResponses {
  routingCallback = (data: Data) => ({
    data: data.title,
    likes: data.likes,
  });
  routingCallbackAdd = () => ({ addedData });
  noData = () => ({ error: noFetchedData });
}
