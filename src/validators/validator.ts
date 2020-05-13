import Joi from "joi";
import { requestGetKeys } from "types/DataTypes";

export class RouterValidator {
  getValidator = (key: requestGetKeys): Joi.ObjectSchema =>
    Joi.object().keys({
      [key]: Joi.number().required(),
    });

  validateRequestForToken = (): Joi.ObjectSchema =>
    Joi.object().keys({
      userName: Joi.string().required(),
      password: Joi.string().required(),
    });

  validateAddUser = (): Joi.ObjectSchema =>
    Joi.object().keys({
      likes: Joi.number().required(),
      title: Joi.string().required(),
    });
}
