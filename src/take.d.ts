import { Action, TakeableChannel } from "redux-saga";
import * as RS from "redux-saga"
import * as RSE from "redux-saga/effects";
import { SagaGenerator } from "./types";


declare function takeOld<A extends Action>(pattern?: RSE.ActionPattern<A>): SagaGenerator<A, RSE.TakeEffect>;
declare function takeOld<T>(channel: TakeableChannel<T>, multicastPattern?: RSE.Pattern<T>): SagaGenerator<T, RSE.ChannelTakeEffect<T>>;
declare function takeOld(pattern?: RSE.ActionPattern): SagaGenerator<any, RSE.TakeEffect>;


declare function take<A extends Action, T extends Action['type'] = Action['type']>(pattern?: RSE.ActionPattern<A>): SagaGenerator<A, RSE.TakeEffect>;
declare function take<T>(channel: TakeableChannel<T>, multicastPattern?: RSE.Pattern<T>): SagaGenerator<T, RSE.ChannelTakeEffect<T>>;
declare function take(pattern?: RSE.ActionPattern): SagaGenerator<any, RSE.TakeEffect>;
