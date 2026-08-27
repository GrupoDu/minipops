export function isListPopulated<T>(list?: T[] | null) {
  return !!list && list.length > 0;
}
