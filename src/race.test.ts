import * as RSE from 'redux-saga/effects';

import { test, expect } from 'bun:test';
import { race } from './race';


test('race()', () => {
  type TestAction =
    | { type: 'ACTION_ONE'; payload: string }
    | { type: 'ACTION_TWO'; payload: number };

  function * testSaga() {
    const a = yield * race([
      RSE.delay(1000)
    ])
    return 'test';
  }
});
