/* eslint-disable @typescript-eslint/no-unused-vars */
import { test } from 'bun:test';
import * as RS from 'redux-saga';

import { makeTake } from './take';

type AppAction1 = { type: 'TEST_ACTION_ONE'; payload: string };
type AppAction2 = { type: 'TEST_ACTION_TWO'; payload: number };
type AppAction  =
  | AppAction1
  | AppAction2;

test('getTakeSafe()', () => {
  test('*: match any action', () => {
    function * _testSaga() {
      const take = makeTake<AppAction>();
      const event = yield * take('*');
      type Event = typeof event;
      AssertEqual<Event, AppAction>
    }
  })



  test('with a string literal', () => {
    function * _testSaga() {
      const take = makeTake<AppAction>();
      const eventFromTake = yield * take('TEST_ACTION_ONE');

      const _ = yield * makeTake<AppAction>()('TEST_ACTION_ONE');
      return 'test';
    }
  })

  test('with a Channel', () => {
    function * _testSaga() {
      const take = makeTake<AppAction>();

      const channel = RS.channel(RS.buffers.none<AppAction>());
      const _eventFromTake = yield * take(channel);

      const _channelEvent = yield * makeTake<AppAction>()(channel);
      return 'test';
    }
  })
});
