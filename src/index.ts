import express = require("express");
import * as mongoDb from "mongodb";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { ParamsDictionary, Query } from "express-serve-static-core";

dotenv.config();

interface Data {
  title: string;
  likes: number;
}

class MongoApplication {
  private app: express.Application;
  constructor() {
    this.app = express();
  }
  applyRouting(routing: express.Router): void {
    this.app.use(routing);
    console.log("ROUTING PREPARED");
  }
  getApp(): express.Application {
    return this.app;
  }
}

class MongoRouter {
  private router: express.Router;
  private routerResponses: RouterResponses;
  constructor() {
    this.router = express.Router();
    this.routerResponses = new RouterResponses();
  }
  prepareRouting(): express.Router {
    this.router.get("/id/:userId", (req, res) => {
      this.routerResponses.getDataById(req, res);
    });
    return this.router;
  }
}

class RouterResponses {
  private mongoController: MongoQueryHandler;
  private callbackClasses: CallbackClass;

  constructor() {
    this.mongoController = new MongoQueryHandler();
    this.callbackClasses = new CallbackClass();
  }

  getDataById(
    req: Request<ParamsDictionary, any, any, Query>,
    res: Response<any>
  ): void {
    let routingCallback = (data: Data) => {
      res.status(200).json(this.callbackClasses.routingCallback(data));
    };
    this.mongoController.getCollectionDataByArray(
      Number(req.params.userId),
      routingCallback
    );
  }
}

class CallbackClass {
  routingCallback(data: Data) {
    return { data: data.title, likes: data.likes };
  }
}

class MongoQueryHandler {
  private connector: Promise<mongoDb.MongoClient>;
  constructor() {
    this.connector = new MongoConnector().getMongoClient();
  }

  getCollectionDataByArray(
    id: number,
    callback: (data: Data, res?: any) => void
  ): void {
    this.connector
      .then((db: any) => {
        db.db(`${process.env.DATABASE}`)
          .collection(`${process.env.COLLECTION}`)
          .findOne({ likes: id }, (err: any, result: Data) => {
            err ? callback(err) : callback(result);
          });
      })
      .catch((err: any) => console.log(err));
  }
}

class MongoConnector {
  private connection: Promise<mongoDb.MongoClient>;

  constructor() {
    this.connection = mongoDb.MongoClient.connect(`${process.env.HOST}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }

  async getMongoClient(): Promise<any> {
    try {
      return await this.connection;
    } catch (err) {
      console.log(err);
    }
  }
}

const application: MongoApplication = new MongoApplication();
const router: MongoRouter = new MongoRouter();
application.applyRouting(router.prepareRouting());
application
  .getApp()
  .listen(3000, () => console.log("Listening for conenctions..."));
