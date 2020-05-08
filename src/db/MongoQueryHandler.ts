import { Data } from "../types/DataTypes";
import { MongoConnector } from "./MongoConnector";
import { MongoClient } from "mongodb";

export class MongoQueryHandler {
  private connector: Promise<MongoClient>;
  private db: string;
  private collection: string;
  constructor() {
    this.connector = new MongoConnector().getMongoClient();
    this.db = `${process.env.DATABASE}`;
    this.collection = `${process.env.COLLECTION}`;
  }

  getCollectionDataByArray(id: number, callback: (data: Data) => void): void {
    this.connector
      .then((db: any) => {
        db.db(this.db)
          .collection(this.collection)
          .findOne({ likes: id }, (err: any, result: Data) => {
            err ? callback(err) : callback(result);
          });
      })
      .catch((err: any) => console.log(err));
  }

  addNewPosition(data: Data, callback: (data: Data) => void): void {
    this.connector
      .then((db: any) => {
        db.db(this.db)
          .collection(this.collection)
          .insertOne(
            { likes: data.likes, title: data.title },
            (err: any, result: Data) => {
              err ? callback(err) : callback(result);
            }
          );
      })
      .catch((err: any) => console.log(err));
  }
}
