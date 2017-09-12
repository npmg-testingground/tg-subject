// @flow
/**
 * This file handles the model/models for
 * the perticular microservice
 */

import Joi from 'joi';

export const SubjectModel = Joi.object({
  name: Joi.string()
}).required();

export const SubjectModelRequired = Joi.object({
	name: Joi.string().required()
}).required();
