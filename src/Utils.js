export function createWrappedGenerator(originalGenerator) {
  return function * (...args) { return yield originalGenerator(...args); };
}
