import {SearchOptions} from 'ldapjs';

import ResultCallback from "../../dto/iNoIdDto/ResultCallback";

export default interface ILdapService {
  isReady(): boolean;

  waitUntilReady(): Promise<void>;

  add(entry: Object, cb?: ResultCallback): void;

  delete(): void;

  modify(): void;

  search(base: string, options: SearchOptions, cb: (content: Object | Error) => void): void;
}