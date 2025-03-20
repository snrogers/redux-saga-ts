import { takeLeading as _takeLeading } from 'redux-saga/effects';

export const makeTakeLeading = () => {
  return function takeLeading(...args) { return _takeLeading(...args); }
}
