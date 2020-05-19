import { Router } from "express";
import { TokenHandler } from "../../tokens/TokenHandler";

export abstract class RouterClass {
  protected router: Router;
  protected tokenHandler: TokenHandler;
  constructor() {
    this.router = Router();
    this.tokenHandler = new TokenHandler();
  }
  abstract getRouting(): Router;
}
