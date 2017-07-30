// @flow
import test from 'ava';
import server from '../src/server';
import type { SubjectPayloadType } from '../src/db/model';

type RequestType = {
  method?: string,
  url: string
};

const requestDefaults: RequestType = {
  method: 'GET',
  url: '/subjects'
};


// Short for test data
const td: SubjectPayloadType = {
  name: 'Math'
};

// Set up a before hook to create a td
test.beforeEach(async t => {
  const createPostRequest: RequestType = {
    method: 'POST',
    url: '/subjects',
    payload: td
  }
  let response = await server.inject(createPostRequest);
  t.context.td = response.result.changes[0].new_val;
});

test('endpoint test | GET /subjects | valid request -> 200 OK', t => {
  const request: RequestType = Object.assign({}, requestDefaults);

  return server.inject(request)
    .then(response => {
      t.is(response.statusCode, 200, 'Everything cool!');
    });
});

test('endpoint test | GET /subjects/{id} | valid request -> 200 OK', t => {
  const id: string = t.context.td.id;
  const request: RequestType = {
    method: 'GET',
    url: `/subjects/${id}`,
  }

  return server.inject(request)
    .then(response => {
      t.is(response.statusCode, 200, 'Everything cool!');
      t.deepEqual(response.result, t.context.td, 'They are the same!')
    });
});
