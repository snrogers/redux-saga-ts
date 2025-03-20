import { take as _take } from 'redux-saga/effects';

export const makeTake = () => {
  return function take(...args) { return _take(...args); }
}
