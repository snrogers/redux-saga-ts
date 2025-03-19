import * as RS from 'redux-saga';

export type Simplify<T> = T extends infer U
                          ? { [K in keyof U]: U[K] }
                          : never

export type EventLookup<
  Action extends RS.Action,
  Event extends Action['type']
> = Action extends { type: Event }
  ? Action
  : never;

export type ChannelEvent<Channel extends RS.Channel<any>> =
  Channel extends RS.Channel<infer Payload>
    ? Payload
    : never;

