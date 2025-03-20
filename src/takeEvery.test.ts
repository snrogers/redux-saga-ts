import { test } from 'bun:test';
import * as RS from 'redux-saga';
import { Equals } from 'ts-toolbelt/out/Any/Equals';

import { makeTakeEvery } from './takeEvery';


test('takeLatest()', () => {
  type AppAction1 = { type: 'TEST_ACTION_ONE'; payload: string };
  type AppAction2 = { type: 'TEST_ACTION_TWO'; payload: number };
  type AppAction  =
    | AppAction1
    | AppAction2;

  type Assert<T extends 1> = T;

  test('*: match any action', () => {
    function * testSaga() {
      const takeLatest = makeTakeEvery<AppAction>();
      const yieldResult = yield * takeLatest(
        '*',
        (event: AppAction) => {
          type assert = Assert<Equals<AppAction, typeof event>>
        }
      );

      type assert = Assert<Equals<undefined, typeof yieldResult>>
    }
  })

  test('with a type predicate', () => {
    function * testSaga() {
      const takeLatest = makeTakeEvery<AppAction>();
      const yieldResult = yield * takeLatest(
        (action => action.type === 'TEST_ACTION_ONE'), (event) => {
          type assert = Assert<Equals<AppAction1, typeof event>>
        }
      );

      type assert = Assert<Equals<undefined, typeof yieldResult>>
    }
  })

  test('with a string', () => {
    function * testSaga() {
      const takeLatest = makeTakeEvery<AppAction>();
      const yieldResult = yield * takeLatest(
        'TEST_ACTION_ONE',
        (event) => {
          type assert = Assert<Equals<AppAction1, typeof event>>
        }
      );

      type assert = Assert<Equals<undefined, typeof yieldResult>>
    }
  })

  test('with an array of strings', () => {
    function * testSaga() {
      const takeLatest = makeTakeEvery<AppAction>();
      const yieldResult = yield * takeLatest(
        ['TEST_ACTION_ONE', 'TEST_ACTION_TWO'],
        (event) => {
          type assert = Assert<Equals<AppAction1 | AppAction2, typeof event>>
        }
      );

      type assert = Assert<Equals<undefined, typeof yieldResult>>
    }
  })

  test('with a Channel', () => {
    function * testSaga() {
      const takeLatest = makeTakeEvery<AppAction>();
      const channel = RS.channel(RS.buffers.none<AppAction>());
      const yieldResult = yield * takeLatest(
        channel,
        (event) => {
          type assert = Assert<Equals<AppAction, typeof event>>
        }
      );

      type assert = Assert<Equals<undefined, typeof yieldResult>>
    }
  })

  test('with a `toString()`-able object', () => {
    function * testSaga() {
      const takeLatest = makeTakeEvery<AppAction>();
      const yieldResult = yield * takeLatest(
        { toString: () => 'TEST_ACTION_ONE' as const },
        (event) => {
          type assert = Assert<Equals<AppAction1, typeof event>>
        }
      );

      type assert = Assert<Equals<undefined, typeof yieldResult>>
    }
  })
});

