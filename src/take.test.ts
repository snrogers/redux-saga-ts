import { test } from 'bun:test';
import * as RS from 'redux-saga';
import { expectTypeOf } from 'expect-type'

import { makeTake } from './take';
import { Equals } from 'ts-toolbelt/out/Any/Equals';


type AppAction1 = { type: 'TEST_ACTION_ONE'; payload: string };
type AppAction2 = { type: 'TEST_ACTION_TWO'; payload: number };
type AppAction  =
  | AppAction1
  | AppAction2;

type Assert<T extends 1> = T;

test('take()', () => {
  test('*: match any action', () => {
    function * _testSaga() {
      const take = makeTake<AppAction>();
      const event = yield * take('*');
      type assert = Assert<Equals<AppAction, typeof event>>
    }
  })

  test('with a type predicate', () => {
    function * _testSaga() {
      const take = makeTake<AppAction>();
      const event = yield * take((action => action.type === 'TEST_ACTION_ONE'));
      type assert = Assert<Equals<AppAction1, typeof event>>
    }
  })

  test('with a string', () => {
    function * _testSaga() {
      const take = makeTake<AppAction>();
      const event = yield * take('TEST_ACTION_ONE');
      type assert = Assert<Equals<AppAction1, typeof event>>
    }
  })

  test('with an array of strings', () => {
    function * _testSaga() {
      const take = makeTake<AppAction>();
      const event = yield * take(['TEST_ACTION_ONE', 'TEST_ACTION_TWO']);
      type assert = Assert<Equals<AppAction1 | AppAction2, typeof event>>
    }
  })

  test('with a Channel', () => {
    function * _testSaga() {
      const take = makeTake<AppAction>();
      const channel = RS.channel(RS.buffers.none<AppAction>());
      const event = yield * take(channel);
      type assert = Assert<Equals<AppAction, typeof event>>
    }
  })

  test('with a `toString()`-able object', () => {
    function * _testSaga() {
      const take = makeTake<AppAction>();
      const event = yield * take({ toString: () => 'TEST_ACTION_ONE' as const });
      type assert = Assert<Equals<AppAction1, typeof event>>
    }
  })
});
