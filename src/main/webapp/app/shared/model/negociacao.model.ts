import { Moment } from 'moment';
import { ICliente } from 'app/shared/model/cliente.model';
import { IProposta } from 'app/shared/model/proposta.model';

export interface INegociacao {
  id?: number;
  data?: string;
  descricao?: string;
  cliente?: ICliente;
  propostas?: IProposta[];
}

export const defaultValue: Readonly<INegociacao> = {};
