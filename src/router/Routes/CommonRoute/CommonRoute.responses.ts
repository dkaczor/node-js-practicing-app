import { RouteResponses } from "../../Classes/RouteResponses.class";

export class CommonRouteResponses extends RouteResponses {
  validationError = (data: any) => ({
    status: "error",
    message: "Invalid request data",
    data,
  });
}
