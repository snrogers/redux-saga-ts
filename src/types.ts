import { Simplify } from "./Utils";
import * as RSE from 'redux-saga/effects';

export type AppAction =
  | TestActionOne
  | TestActionTwo;

export type TestActionOne = { type: 'TEST_ACTION_ONE'; payload: string };
export type TestActionTwo = { type: 'TEST_ACTION_TWO'; payload: number };

export type AppActionType    = AppAction['type'];
export type AppActionPayload = AppAction['payload'];

export type ActionFromPattern<P extends string, AppEvent> =
  AppEvent extends { type: P }
  ? AppEvent
  : never;

export type ActionTypePayloadDict<T extends AppActionType> = 
  Simplify<{ [K in T]: AppActionPayload }>;

export type SagaGenerator<RT, E extends RSE.Effect = RSE.Effect<any, any>> = Generator<
  E,
  RT
>;

