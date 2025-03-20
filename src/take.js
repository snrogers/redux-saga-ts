import { take as _take } from 'redux-saga/effects';
import { createWrappedGenerator } from './Utils';

export const makeTake = () => createWrappedGenerator(_take)
