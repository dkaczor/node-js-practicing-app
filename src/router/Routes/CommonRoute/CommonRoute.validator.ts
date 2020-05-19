import Joi from "joi";

export class CommonRouterValidator {
  validateRequestForToken = (): Joi.ObjectSchema =>
    Joi.object().keys({
      userName: Joi.string().required(),
      password: Joi.string().required(),
    });
}
