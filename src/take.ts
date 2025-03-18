import * as RS from 'redux-saga';
import { take as rawTake, SagaReturnType } from 'redux-saga/effects';
import { AppAction as AppEvent, SagaGenerator, ActionFromPattern } from './types';
import { Simplify } from './Utils';


function getTakeSafe<Event extends RS.Action>() {
  return function take<EventType extends Event['type']>(
    pattern: EventType,
    saga: (action: ActionFromPattern<EventType, AppEvent>) => SagaReturnType<any>
  ) {
    return rawTake(pattern) as unknown as SagaGenerator<Simplify<Event & { type: EventType }>, any>;
  };
}

const take = getTakeSafe<AppEvent>();

function * test() {
    const a = yield * take(
    'TEST_ACTION_ONE',
    function * (action: ActionFromPattern<'TEST_ACTION_ONE', AppEvent>) {
        return 'test';
    }
  );
}
