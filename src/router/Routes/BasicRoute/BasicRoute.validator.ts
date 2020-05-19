import Joi from "joi";
import { requestGetKeys } from "types/DataTypes";

export class BasicRouteValidator {
  getValidator = (key: requestGetKeys): Joi.ObjectSchema =>
    Joi.object().keys({
      [key]: Joi.number().required(),
    });
  validateAddUser = (): Joi.ObjectSchema =>
    Joi.object().keys({
      likes: Joi.number().required(),
      title: Joi.string().required(),
    });
}
