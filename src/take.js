import { take as _take } from 'redux-saga/effects';

export const makeTake = () => {
  return function ta ke(...args) { return _take(...args); }
}
