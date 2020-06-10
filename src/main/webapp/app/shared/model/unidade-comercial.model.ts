import { IProposta } from 'app/shared/model/proposta.model';

export interface IUnidadeComercial {
  id?: number;
  cnpj?: number;
  razaoSocial?: string;
  propostas?: IProposta[];
}

export const defaultValue: Readonly<IUnidadeComercial> = {};
