import { test } from 'bun:test';
import * as RS from 'redux-saga';
import { Equals } from 'ts-toolbelt/out/Any/Equals';

import { makeTake } from './take';


test('take()', () => {
  type AppAction1 = { type: 'TEST_ACTION_ONE'; payload: string };
  type AppAction2 = { type: 'TEST_ACTION_TWO'; payload: number };
  type AppAction  =
    | AppAction1
    | AppAction2;

  type Assert<T extends 1> = T;

  test('*: match any action', () => {
    function * testSaga() {
      const take = makeTake<AppAction>();
      const event = yield * take('*');

      type assert = Assert<Equals<AppAction, typeof event>>
    }
  })

  test('with a type predicate', () => {
    function * testSaga() {
      const take = makeTake<AppAction>();
      const event = yield * take((action => action.type === 'TEST_ACTION_ONE'));

      type assert = Assert<Equals<AppAction1, typeof event>>
    }
  })

  test('with a string', () => {
    function * testSaga() {
      const take = makeTake<AppAction>();
      const event = yield * take('TEST_ACTION_ONE');

      type assert = Assert<Equals<AppAction1, typeof event>>
    }
  })

  test('with an array of strings', () => {
    function * testSaga() {
      const take = makeTake<AppAction>();
      const event = yield * take(['TEST_ACTION_ONE', 'TEST_ACTION_TWO']);

      type assert = Assert<Equals<AppAction1 | AppAction2, typeof event>>
    }
  })

  test('with a Channel', () => {
    function * testSaga() {
      const take = makeTake<AppAction>();
      const channel = RS.channel(RS.buffers.none<AppAction>());
      const event = yield * take(channel);

      type assert = Assert<Equals<AppAction, typeof event>>
    }
  })

  test('with a `toString()`-able object', () => {
    function * testSaga() {
      const take = makeTake<AppAction>();
      const event = yield * take({ toString: () => 'TEST_ACTION_ONE' as const });

      type assert = Assert<Equals<AppAction1, typeof event>>
    }
  })
});
