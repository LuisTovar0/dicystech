export interface ResultCallback {
  (result: Object | Error): void;
}

export interface StringConsumer {
  (m: string): void;
}

export interface SimpleLogger {
  info: StringConsumer;
  error: StringConsumer;
}