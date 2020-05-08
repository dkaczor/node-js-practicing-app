import { MongoClient } from "mongodb";

interface ConenctionData {
  database: string;
  collection: string;
}

export class MongoConnector {
  private connection: Promise<MongoClient>;
  private connectionData: ConenctionData;

  constructor() {
    this.connection = MongoClient.connect(`${process.env.HOST}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    this.connectionData = {
      database: `${process.env.DATABASE}`,
      collection: `${process.env.COLLECTION}`,
    };
  }

  async getMongoClient(): Promise<any> {
    try {
      return await this.connection;
    } catch (err) {
      console.log(err);
    }
  }

  async getMongoCollection(): Promise<any> {
    try {
      let data = await this.connection.then((db: any) => {
        db.db(this.connectionData.database).collection(
          this.connectionData.collection
        );
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
