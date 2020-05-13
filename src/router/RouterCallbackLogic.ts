import { Data } from "types/DataTypes";

export class CallbackClass {
  routingCallback = (data: Data) => ({
    data: data.title,
    likes: data.likes,
  });
  routingCallbackAdd = () => ({ added: "OK" });
  validationError = (data: any) => ({
    status: "error",
    message: "Invalid request data",
    data,
  });
}
