import { ParamsDictionary } from "express-serve-static-core";
import { Request } from "express";

export interface Data {
  title: string;
  likes: number;
}

export type requestGetKeys = "userId" | "likesCount";

export interface ParamsWithUser
  extends Request<ParamsDictionary, any, any, any> {
  user?: any;
}
