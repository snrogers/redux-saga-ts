import * as RS from 'redux-saga';
import * as RSE from 'redux-saga/effects';
import { ChannelEvent } from './Utils';
import { EventLookup, SagaGenerator } from './Utils';


/**
 * take(pattern)
 *
 * Creates an Effect description that instructs the middleware to wait
 * for a specified action on the Store.
 *
 * The Generator is suspended until an action that matches pattern is dispatched.
 *
 * The result of yield take(pattern) is an action object being dispatched.
 *
 * pattern is interpreted using the following rules:
 *
 * - [x]
 *   If take is called with no arguments or '*'
 *   all dispatched actions are matched (e.g. take() will match all actions)
 *
 * - [x]
 * If it is a function, the action is matched
 * if pattern(action) is true (e.g. take(action => action.entities)
 * will match all actions having a (truthy) entities field.)
 *
 * - [x]
 * Note: if the pattern function has toString defined on it,
 * action.type will be tested against pattern.toString() instead.
 * This is useful if you're using an action creator library like redux-act or redux-actions.
 *
 * - [x]
 * If it is a String, the action is matched
 * if action.type === pattern (e.g. take(INCREMENT_ASYNC))
 *
 * - [ ] TODO: Unimplemented
 * If it is an array, each item in the array is matched with
 * aforementioned rules, so the mixed array of strings and function
 * predicates is supported. The most common use case is an array of strings though,
 * so that action.type is matched against all items in the array (e.g. take([INCREMENT, DECREMENT])
 * and that would match either actions of type INCREMENT or DECREMENT).
 *
 * The middleware provides a special action END. If you dispatch the END action,
 * then all Sagas blocked on a take Effect will be terminated regardless of the
 * specified pattern. If the terminated Saga has still some forked tasks
 * which are still running, it will wait for all the child tasks
 * to terminate before terminating the Task.
 */
// TODO: Can I deduplicate some fallbacks?
declare interface makeTake {
  <Event extends RS.Action>(): {
    /** Match any action */
    (pattern: '*'): SagaGenerator<Event, RSE.TakeEffect>;

    /** Constraining signature for predicates */
    <Ev extends Event>(fn: (action: Event) => action is Ev): SagaGenerator<Ev, RSE.TakeEffect>;

    /** Expansive signature for predicates */
    (fn: (action: Event) => boolean): SagaGenerator<EventType, RSE.TakeEffect>;

    /** Match single string */
    <EventType extends Event['type']>(pattern: EventType):
      SagaGenerator<EventLookup<Event, EventType>, RSE.TakeEffect>;

    /** Match array of strings */
    <EventType extends Event['type']>(pattern: [...EventType[]]):
      SagaGenerator<EventLookup<Event, EventType>, RSE.TakeEffect>;

    /** Constraining signature for strings AND predicates */
    <EventType extends Event['type']>(pattern: [...(EventType | ((action: Event) => action is Simplify<Event & { type: EventType }>))[]]):
      SagaGenerator<EventLookup<Event, EventType>, RSE.TakeEffect>;

    /** Fallback expansive signature for strings AND predicates */
    (pattern: [...(EventType | ((action: Event) => boolean))[]]):
      SagaGenerator<EventLookup<Event, EventType>, RSE.TakeEffect>;

    /** Constraining `toString()` signature */
    <Obj extends { toString: () => ET }>(pattern: Obj):
      SagaGenerator<EventLookup<Event, ReturnType<Obj['toString']>>, RSE.TakeEffect>;

    /** Expansive toString() signature */
    (pattern: { toString: () => string }): SagaGenerator<EventType, RSE.TakeEffect>;

    /** Constraining signature for Channels */
    <Channel extends RS.Channel>(channel: Channel):
      SagaGenerator<ChannelEvent<Channel>, RSE.TakeEffect>;

    /** Fallback expansive signature for Channels */
    (channel: RS.Channel): SagaGenerator<ChannelEvent<Channel>, RSE.TakeEffect>;
  }
}

declare const makeTake: makeTake;
