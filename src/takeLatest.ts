import * as RS from 'redux-saga';
import { takeLatest as rawTakeLatest, SagaReturnType } from 'redux-saga/effects';
import { AppAction as AppEvent, SagaGenerator, ActionFromPattern } from './types';


function getTakeLatestSafe<Event extends RS.Action>() {
  return function takeLatest<EventType extends Event['type']>(
    pattern: EventType,
    saga: (action: ActionFromPattern<EventType, AppEvent>) => SagaReturnType<any>
  ) {
    return rawTakeLatest(pattern, saga) as unknown as SagaGenerator<undefined>;
  };
}

const takeLatest = getTakeLatestSafe<AppEvent>();

function * test() {
    const _ = yield * takeLatest(
    'TEST_ACTION_ONE',
    function * (action) {
        return 'test';
    }
  );
}
