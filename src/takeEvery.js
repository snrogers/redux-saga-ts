import { takeEvery as _takeEvery } from 'redux-saga/effects';
import { createWrappedGenerator } from './Utils';

export const makeTakeEvery = () => createWrappedGenerator(_takeEvery)
