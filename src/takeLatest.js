import { takeLatest as _takeLatest } from 'redux-saga/effects';

export const makeTakeLatest = () => {
  return function takeLatest(...args) { return _takeLatest(...args); }
}
