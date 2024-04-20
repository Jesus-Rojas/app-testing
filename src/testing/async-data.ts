import { defer } from "rxjs";

export function observableSuccess<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function observableError(error?: unknown) {
  return defer(() => Promise.reject(error));
}

export function promiseSuccess<T>(data: T) {
  return Promise.resolve(data);
}
