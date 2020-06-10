import { Moment } from 'moment';
import { IProposta } from 'app/shared/model/proposta.model';
import { ICliente } from 'app/shared/model/cliente.model';

export interface INegociacao {
  id?: number;
  data?: string;
  descricao?: string;
  propostas?: IProposta[];
  cliente?: ICliente;
}

export const defaultValue: Readonly<INegociacao> = {};
