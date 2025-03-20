# redux-saga-ts

## TODO: Fully re-export everything from redux-saga and correct this readme

A TypeScript-enhanced wrapper for Redux Saga, providing type-safe utilities for managing side effects in Redux applications.

rip typed-redux-saga you were a real one

## Purpose

The redux-saga-ts library enhances the Redux Saga experience for TypeScript developers by offering type-safe wrappers around key Redux Saga effects. It aims to simplify the integration of Redux Saga into TypeScript projects, ensuring better type checking and autocompletion for commonly used saga patterns. Currently, it supports a subset of the Redux Saga API, with ongoing efforts to expand coverage in future releases.

## Getting Started

To start using redux-saga-ts, you can install it as a dependency in your existing project.



### Installation

Install the library and its dependencies:

```bash
bun install
```

### Testing

Run tests to verify the library:

```bash
bun test
```

## Supported Redux Saga Functions

The following checklist outlines the Redux Saga API and indicates which functions have been typed and wrapped in redux-saga-ts. Checked items (✅) are fully supported with TypeScript typings, while unchecked items (❌) are not yet implemented but may be planned for future releases.

### Middleware API

- ✅ createSagaMiddleware(options)
  (Supported but not wrapped; assumed to be compatible as it's fundamental to Redux Saga usage.)
- ✅ middleware.run(saga, ...args)
  (Indirectly supported through wrapped effects.)

### Effect Creators

- ✅ take(pattern)
  Fully typed and wrapped in take.js and take.d.ts.
- ❌ takeMaybe(pattern)
  Not yet implemented.
- ✅ take(channel)
  Supported as part of the take implementation with channel support.
- ❌ takeMaybe(channel)
  Not yet implemented.
- ✅ takeEvery(pattern, saga, ...args)
  Fully typed and wrapped in takeEvery.js and takeEvery.d.ts.
- ✅ takeEvery(channel, saga, ...args)
  Supported through the takeEvery implementation.
- ✅ takeLatest(pattern, saga, ...args)
  Fully typed and wrapped in takeLatest.js and takeLatest.d.ts.
- ✅ takeLatest(channel, saga, ...args)
  Supported through the takeLatest implementation.
- ✅ takeLeading(pattern, saga, ...args)
  Fully typed and wrapped in takeLeading.js and takeLeading.d.ts.
- ✅ takeLeading(channel, saga, ...args)
  Supported through the takeLeading implementation.
- ❌ put(action)
  Not yet implemented.
- ❌ putResolve(action)
  Not yet implemented.
- ❌ put(channel, action)
  Not yet implemented.
- ❌ call(fn, ...args)
  Not yet implemented.
- ❌ call([context, fn], ...args)
  Not yet implemented.
- ❌ call([context, fnName], ...args)
  Not yet implemented.
- ❌ call({context, fn}, ...args)
  Not yet implemented.
- ❌ apply(context, fn, [args])
  Not yet implemented.
- ❌ cps(fn, ...args)
  Not yet implemented.
- ❌ cps([context, fn], ...args)
  Not yet implemented.
- ❌ cps({context, fn}, ...args)
  Not yet implemented.
- ❌ fork(fn, ...args)
  Not yet implemented.
- ❌ fork([context, fn], ...args)
  Not yet implemented.
- ❌ fork({context, fn}, ...args)
  Not yet implemented.
- ❌ spawn(fn, ...args)
  Not yet implemented.
- ❌ spawn([context, fn], ...args)
  Not yet implemented.
- ❌ join(task)
  Not yet implemented.
- ❌ join([...tasks])
  Not yet implemented.
- ❌ cancel(task)
  Not yet implemented.
- ❌ cancel([...tasks])
  Not yet implemented.
- ❌ cancel()
  Not yet implemented.
- ❌ select(selector, ...args)
  Not yet implemented.
- ❌ actionChannel(pattern, [buffer])
  Not yet implemented.
- ❌ flush(channel)
  Not yet implemented.
- ❌ cancelled()
  Not yet implemented.
- ❌ setContext(props)
  Not yet implemented.
- ❌ getContext(prop)
  Not yet implemented.
- ❌ delay(ms, [val])
  Not yet implemented.
- ❌ throttle(ms, pattern, saga, ...args)
  Not yet implemented.
- ❌ throttle(ms, channel, saga, ...args)
  Not yet implemented.
- ❌ debounce(ms, pattern, saga, ...args)
  Not yet implemented.
- ❌ debounce(ms, channel, saga, ...args)
  Not yet implemented.
- ❌ retry(maxTries, delay, fn, ...args)
  Not yet implemented.

### Effect Combinators

- ❌ race(effects)
  Not yet implemented.
- ❌ race([...effects])
  Not yet implemented.
- ❌ all([...effects])
  Not yet implemented.
- ❌ all(effects)
  Not yet implemented.

### Interfaces

- ✅ Task
  (Used internally; assumed to be compatible with wrapped effects.)
- ✅ Channel
  (Used internally; assumed to be compatible with wrapped effects.)
- ✅ Buffer
  (Used internally; assumed to be compatible with wrapped effects.)
- ❌ SagaMonitor
  Not yet implemented (optional feature).

### External API

- ❌ runSaga(options, saga, ...args)
  Not yet implemented.

### Utils

- ❌ channel([buffer])
  Not yet implemented.
- ❌ eventChannel(subscribe, [buffer])
  Not yet implemented.
- ❌ buffers
  Not yet implemented.
- ❌ cloneableGenerator(generatorFunc)
  Not yet implemented (testing utility).
- ❌ createMockTask()
  Not yet implemented (testing utility).

## Usage Example

Here's a simple example of how to use the typed takeEvery effect from redux-saga-ts:

```typescript
``import { makeTakeEvery } from 'redux-saga-ts';
import { put } from 'redux-saga/effects';

type FetchUserAction = { type: 'FETCH_USER'; payload: string };
type UserFetchSucceededAction = { type: 'USER_FETCH_SUCCEEDED'; payload: string };
type AppAction = FetchUserAction | UserFetchSucceededAction;

const takeEvery = makeTakeEvery<AppAction>();

function* fetchUserSaga(action: FetchUserAction) {
  console.log(`Fetching user: ${action.payload}`);
  yield put({ type: 'USER_FETCH_SUCCEEDED', payload: action.payload });
}

function* rootSaga() {
  yield* takeEvery('FETCH_USER', fetchUserSaga);
}
```

This example demonstrates the type safety provided by redux-saga-ts, ensuring that action is properly typed when passed to fetchUserSaga.

## Contributing

We welcome contributions to expand the coverage of Redux Saga functions in redux-saga-ts. To contribute:

1. Fork the repository.
2. Add or improve type-safe wrappers for Redux Saga functions.
3. Update the checklist in this README accordingly.
4. Submit a pull request.

Please ensure that tests pass (bun test) and that your code adheres to the existing style and structure.

## Roadmap

Future development will focus on:

- Adding type-safe wrappers for additional effect creators like put, call, and fork.
- Supporting effect combinators such as race and all.
- Enhancing utility functions and external APIs for broader use cases.

Check the checklist above to see which functions are next in line for implementation.

## License

MIT
