import * as RS from 'redux-saga';
import * as RSE from 'redux-saga/effects';

export type ChannelEvent<Channel extends RS.Channel<any>> =
  Channel extends RS.Channel<infer Payload>
    ? Payload
    : never;

export type EventLookup<
  Event     extends RS.Action<any>,
  EventType extends Event['type']
> = Extract<Event, { type: EventType }>;

export type SagaGenerator<RT, E extends RSE.Effect = RSE.Effect<any, any>> = Generator<
  E,
  RT
>;

export type Simplify<T> = T extends infer U
                          ? { [K in keyof U]: U[K] }
                          : never
