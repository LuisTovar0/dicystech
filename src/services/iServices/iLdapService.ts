import {SearchOptions} from 'ldapjs';

export default interface ILdapService {
  add(entry: Object): void;

  delete(): void;

  modify(): void;

  search(base: string, options: SearchOptions, callback: (content: Object | Error) => void): void;
}