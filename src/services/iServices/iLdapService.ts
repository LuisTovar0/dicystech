import {SearchOptions} from 'ldapjs';
import {Observable} from "rxjs";

export default interface ILdapService {
  add(entry: Object): void;

  delete(): void;

  modify(): void;

  search(base: string, options: SearchOptions): Observable<Object>;
}