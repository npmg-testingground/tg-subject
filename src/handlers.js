// @flow
import env from './env.config';
import Boom from 'boom';
import r from './db/config';
import { checkIfSubjectExists } from './helpers';

// Types
import type { SubjectPayloadType } from './db/model';
export type ReplyFunctionType = (_: (string | {})) => string;

export function getAllSubjects(_request, reply: ReplyFunctionType) {
	r.table(env.DB_TABLE_NAME).then(result => {
		reply(result);
	}).catch(err => {
		reply(Boom.badImplementation(err))
	});
}

export function getSubject(request: Object, reply: ReplyFunctionType) {
	const { subjectId } : {
    subjectId: string
  } = request.params;
	r.table(env.DB_TABLE_NAME).get(subjectId).then(result => {
		reply(result);
	}).catch(err => {
		reply(Boom.badImplementation(err))
	});
}

export async function createSubject(request: Object, reply: ReplyFunctionType): void {
	const { payload }: {
    payload: SubjectPayloadType
  } = request;
  const roomExists: bool = await checkIfSubjectExists(payload);
  if (roomExists) {
    reply(Boom.badData("There is already a subject with these parameters!"))
  }
	r.table(env.DB_TABLE_NAME).insert(
    r.expr(payload).merge({
      createdAt: r.now()
    }),
    // This tells rethinkdb that changes should be return
    {returnChanges: true}
  )
  .then(result => {
    reply(result)
  })
  .catch(err => {
    reply(Boom.badImplementation(err))
  });
}

/**
 * Change the whole object in the database,
 * you should pass the every property of the
 * object you want to change
 */
export function putSubject(request: Object, reply: ReplyFunctionType) {
	const { subjectId }: { subjectId: string } = request.params;
	const { payload }: {
    payload: SubjectPayloadType
  } = request;
	payload.id = subjectId;
	r.table(env.DB_TABLE_NAME)
    .get(subjectId)
    .replace(payload, {returnChanges: true})
    .then(changes => {
      reply(changes)
    })
    .catch(err => {
      reply(Boom.badImplementation(err))
    });
}

/**
 * Change part of the object in the database,
 * you should pass only the properties 
 * you want to be changed
 */
export function patchSubject(request: Object, reply: ReplyFunctionType) {
	const { subjectId } : {subjectId: string} = request.params;
	const { payload }: {
    payload: SubjectPayloadType
  } = request;
  
	r.table(env.DB_TABLE_NAME)
		.get(subjectId)
		.update(payload, {returnChanges: true})
		.then(changes => {
				reply(changes)
		})
		.catch(err => {
				reply(Boom.badImplementation(err))
		});
}

export function deleteSubject(request: Object, reply: ReplyFunctionType) {
	const { subjectId }: { subjectId: string } = request.params;
	r.table(env.DB_TABLE_NAME)
		.get(subjectId)
		.delete({returnChanges: true})
		.then(changes => {
				reply(changes)
		})
		.catch(err => {
				reply(Boom.badImplementation(err))
		});
}