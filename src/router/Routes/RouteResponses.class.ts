export class RouteResponses {
  validationError = (data: any) => ({
    status: "error",
    message: "Invalid request data",
    data,
  });
}
