import { Data } from "types/DataTypes";
import { QueryHandler } from "./Classes/QueryHandler.class";

export class MongoQueryHandler extends QueryHandler {
  constructor() {
    super();
  }

  getCollectionDataByArray(id: number, callback: (data: Data) => void): void {
    this.connector
      .then((collection) => {
        collection.findOne({ likes: id }, (err: any, result: Data) => {
          err ? callback(err) : callback(result);
        });
      })
      .catch((err: any) => console.log(err));
  }

  addNewPosition(data: Data, callback: (data: Data) => void): void {
    this.connector
      .then((collection) => {
        collection.insertOne(
          { likes: data.likes, title: data.title },
          (err: any, result: Data) => {
            err ? callback(err) : callback(result);
          }
        );
      })
      .catch((err: any) => console.log(err));
  }
}
