// @flow
import env from './env.config';
import r from './db/config';

import type { SubjectPayloadType } from './db/model';

export function checkIfSubjectExists(room: SubjectPayloadType): bool {
  return r.table(env.DB_TABLE_NAME)
  .filter(room)
  .count()
  .eq(1)
}
