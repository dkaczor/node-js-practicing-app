import { MongoQueryHandler } from "../../database/MongoQueryHandler";

export class RouteActions {
  protected mongoController: MongoQueryHandler;
  constructor() {
    this.mongoController = new MongoQueryHandler();
  }
}
