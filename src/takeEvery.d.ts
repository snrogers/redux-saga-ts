import * as RS from 'redux-saga';
import * as RSE from 'redux-saga/effects';

import { ChannelEvent } from './Utils';
import { EventLookup, SagaGenerator } from './Utils';

declare const makeTakeEvery: makeTakeEvery;

type EventDict<Event, EventType> =
  Event extends { type: EventType }
    ? Event
    : never;

declare interface makeTakeEvery {
  <Event extends RS.Action>(): {
    /** Match any action */
    (
      pattern: '*',
      fn: (action: Event) => SagaGenerator
    ): SagaGenerator<undefined, RSE.TakeEveryEffect>;

    /** Constraining signature for predicates */
    <Ev extends Event>(
      fn: (action: Event) => action is Ev,
      fn: (action: Ev) => SagaGenerator
    ): SagaGenerator<undefined, RSE.TakeEveryEffect>;

    /** Expansive signature for predicates */
    (
      fn: (action: Event) => boolean,
      fn: (action: Event) => SagaGenerator
    ): SagaGenerator<undefined, RSE.TakeEveryEffect>;

    // TODO: List of Type Predicates? But its a useless overload? Is it?

    /** Match single string */
    <EventType extends Event['type']>(
      pattern: EventType,
      fn: (action: EventDict<Event, EventType>) => SagaGenerator
    ): SagaGenerator<undefined, RSE.TakeEveryEffect>;

    /** Match array of strings */
    <EventType extends Event['type']>(
      pattern: [...EventType[]],
      fn: (action: Event) => SagaGenerator
    ): SagaGenerator<undefined, RSE.TakeEveryEffect>;

    /** Constraining signature for strings AND predicates */
    <EventType extends Event['type']>(
      pattern: [...(EventType | ((action: Event) => action is Simplify<Event & { type: EventType }>))[]],
      fn: (action: Event) => SagaGenerator
    ): SagaGenerator<undefined, RSE.TakeEveryEffect>;

    /** Fallback expansive signature for strings AND predicates */
    (
      pattern: [...(EventType | ((action: Event) => boolean))[]],
      fn: (action: Event) => SagaGenerator
    ): SagaGenerator<undefined, RSE.TakeEveryEffect>;

    /** Constraining `toString()` signature */
    <Obj extends { toString: () => Event['type'] }>(
      pattern: Obj,
      fn: (action: EventDict<Event, ReturnType<Obj['toString']>>) => SagaGenerator
    ): SagaGenerator<undefined, RSE.TakeEveryEffect>;

    /** Expansive toString() signature */
    (
      pattern: { toString: () => string },
      fn: (action: Event) => SagaGenerator
    ): SagaGenerator<undefined, RSE.TakeEveryEffect>;

    /** Constraining signature for Channels */
    <Channel extends RS.Channel>(
      channel: Channel,
      fn: (action: Event) => SagaGenerator
    ): SagaGenerator<undefined, RSE.TakeEveryEffect>;

    /** Fallback expansive signature for Channels */
    (
      channel: RS.Channel,
      fn: (action: Event) => SagaGenerator
    ): SagaGenerator<undefined, RSE.TakeEveryEffect>;
  }
}

