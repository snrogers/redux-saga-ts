import { test } from 'bun:test';
import * as RS from 'redux-saga';
import { Equals } from 'ts-toolbelt/out/Any/Equals';

import { makeTakeLeading } from './takeLeading';


test('takeLeading()', () => {
  type AppAction1 = { type: 'TEST_ACTION_ONE'; payload: string };
  type AppAction2 = { type: 'TEST_ACTION_TWO'; payload: number };
  type AppAction  =
    | AppAction1
    | AppAction2;

  type Assert<T extends 1> = T;

  test('*: match any action', () => {
    function * testSaga() {
      const takeLeading = makeTakeLeading<AppAction>();
      const yieldResult = yield * takeLeading(
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
      const takeLeading = makeTakeLeading<AppAction>();
      const yieldResult = yield * takeLeading(
        (action => action.type === 'TEST_ACTION_ONE'), (event) => {
          type assert = Assert<Equals<AppAction1, typeof event>>
        }
      );

      type assert = Assert<Equals<undefined, typeof yieldResult>>
    }
  })

  test('with a string', () => {
    function * testSaga() {
      const takeLeading = makeTakeLeading<AppAction>();
      const yieldResult = yield * takeLeading(
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
      const takeLeading = makeTakeLeading<AppAction>();
      const yieldResult = yield * takeLeading(
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
      const takeLeading = makeTakeLeading<AppAction>();
      const channel = RS.channel(RS.buffers.none<AppAction>());
      const yieldResult = yield * takeLeading(
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
      const takeLeading = makeTakeLeading<AppAction>();
      const yieldResult = yield * takeLeading(
        { toString: () => 'TEST_ACTION_ONE' as const },
        (event) => {
          type assert = Assert<Equals<AppAction1, typeof event>>
        }
      );

      type assert = Assert<Equals<undefined, typeof yieldResult>>
    }
  })
});
