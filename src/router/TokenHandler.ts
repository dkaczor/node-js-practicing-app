import { ParamsWithUser } from "types/DataTypes";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { TEMPORARY_USER_DATA } from "../app/TemporaryConstants";
import { CallbackClass } from "./RouterCallbackLogic";

export class TokenHandler {
  private routerCallback: CallbackClass;

  constructor() {
    this.routerCallback = new CallbackClass();
  }
  authenticateJWT = (
    req: ParamsWithUser,
    res: Response<any>,
    next: () => void
  ) => {
    const { authorization } = req.headers;

    if (authorization) {
      jwt.verify(
        authorization.split(" ")[1],
        `${process.env.API_TOKEN}`,
        (err, user) => {
          if (err) {
            return res.sendStatus(403);
          }
          req.user = user;
          next();
        }
      );
    } else {
      res.sendStatus(401);
    }
  };

  getToken = (value: any, res: Response<any>) => {
    const selectedUser = TEMPORARY_USER_DATA.find((user) => {
      return (
        user.userName === value.userName && user.password === value.password
      );
    });

    if (!selectedUser) {
      res
        .status(422)
        .json(this.routerCallback.validationError("Not found user"));
      return;
    }
    return jwt.sign(
      { userName: selectedUser.userName, role: selectedUser.role },
      `${process.env.API_TOKEN}`,
      { expiresIn: "20m" }
    );
  };
}
