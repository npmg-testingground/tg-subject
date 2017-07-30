// @flow
/**
 * This file handles the model/models for
 * the perticular microservice
 */

import Joi from 'joi';

export type SubjectPayloadType = {
  id?: string,
  name: string
};

export const SubjectModel: Object = Joi.object({
  name: Joi.string()
}).required();

export const SubjectModelRequired: Object = Joi.object({
	name: Joi.string().required()
}).required();
