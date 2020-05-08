import * as dotenv from "dotenv";
import { MongoRouter } from "./router/AppRouter";
import { MongoApplication } from "./app/AppComponent";

dotenv.config();

const application: MongoApplication = new MongoApplication();
const router: MongoRouter = new MongoRouter();
application.applyPostBodyUsage();
application.applyRouting(router.prepareRouting());
application.listen();
