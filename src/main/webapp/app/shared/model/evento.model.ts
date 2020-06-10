import { Moment } from 'moment';
import { IProposta } from 'app/shared/model/proposta.model';

export interface IEvento {
  id?: number;
  dataEmissao?: string;
  dataVencimento?: string;
  descricao?: string;
  valor?: string;
  proposta?: IProposta;
}

export const defaultValue: Readonly<IEvento> = {};
