import { Data } from "../types/DataTypes";

export class CallbackClass {
  routingCallback(data: Data) {
    return { data: data.title, likes: data.likes };
  }
  routingCallbackAdd() {
    return { added: "OK" };
  }
}
