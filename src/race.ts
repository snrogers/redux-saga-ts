import * as RS from 'redux-saga';
import * as RSE from 'redux-saga/effects';

export function * race<T>(sagaIters: [...RS.SagaIterator<T>[]]) {
  while (true) {
    const { value, done } = yield RSE.race(sagaIters);
    if (done) {
      return value;
    }
  }
}
