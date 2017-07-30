// @flow
import * as handlers from './handlers';

import {
	SubjectModel,
	SubjectModelRequired
} from './db/model';

import type { ReplyFunctionType } from './handlers';

export type RouteType = {
  method: string,
  path: string,
  handler: ReplyFunctionType,
  config?: {
    validate: {
      payload: Object
    }
  }
};

const routes: Array<RouteType> = [
	{
		method: 'GET',
		path: '/subjects',
		handler: handlers.getAllSubjects
	},
	{
		method: 'GET',
		path: '/subjects/{subjectId}',
		handler: handlers.getSubject
	},
	{
		method: 'POST',
		path: '/subjects',
		handler: handlers.createSubject,
		config: {
			validate: {
				payload: SubjectModelRequired
			}
		}
	},
	{
		method: 'PUT',
    path: '/subjects/{subjectId}',
    handler: handlers.putSubject,
		config: {
			validate: {
				payload: SubjectModelRequired
			}
		}
	},
	{
		method: 'PATCH',
    path: '/subjects/{subjectId}',
    handler: handlers.patchSubject,
		config: {
			validate: {
				payload: SubjectModel
			}
		}
	},
	{
		method: 'DELETE',
		path: '/subjects/{subjectId}',
		handler: handlers.deleteSubject
	}
]

export default routes;
