import { MongoConnector } from "../MongoConnector";

export class QueryHandler {
  protected connector: Promise<any>;
  constructor() {
    this.connector = new MongoConnector().getCollection();
  }
}
