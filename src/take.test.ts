import { test, expect } from 'bun:test';
import { typedTake } from './take';

test('take()', () => {
  function * testSaga() {
    const a = yield * typedTake('TEST_ACTION_ONE');
    return 'test';
  }
});

