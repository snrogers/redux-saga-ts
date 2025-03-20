import { takeLatest as _takeLatest } from 'redux-saga/effects';
import { createWrappedGenerator } from './Utils';

export const makeTakeLatest = () => createWrappedGenerator(_takeLatest)
