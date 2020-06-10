export interface IUnidadeComercial {
  id?: number;
  cnpj?: number;
  razaoSocial?: string;
}

export const defaultValue: Readonly<IUnidadeComercial> = {};
