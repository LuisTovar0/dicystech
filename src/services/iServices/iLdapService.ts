export default interface ILdapService {
  ping(): Promise<string>;

  ldapadd(): void;

  ldapdelete(): void;

  ldapmodify(): void;
}