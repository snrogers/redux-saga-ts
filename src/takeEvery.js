import { takeEvery as _takeEvery } from 'redux-saga/effects';

export const makeTakeEvery = () => {
  return function takeEvery(...args) { return _takeEvery(...args); }
}
