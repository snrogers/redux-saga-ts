import { takeLeading as _takeLeading } from 'redux-saga/effects';
import { createWrappedGenerator } from './Utils';

export const makeTakeLeading = () => createWrappedGenerator(_takeLeading)
