import { Simplify } from "./Utils";
import * as RSE from 'redux-saga/effects';


export type SagaGenerator<RT, E extends RSE.Effect = RSE.Effect<any, any>> = Generator<
  E,
  RT
>;

