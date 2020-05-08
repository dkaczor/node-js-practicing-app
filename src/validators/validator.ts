import Joi from "joi";
import { requestGetKeys } from "types/DataTypes";

export class RouterValidator {
  getValidator(key: requestGetKeys): Joi.ObjectSchema {
    return Joi.object().keys({
      [key]: Joi.number().required(),
    });
  }
}
