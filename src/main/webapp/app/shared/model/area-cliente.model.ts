import { IProposta } from 'app/shared/model/proposta.model';
import { ICliente } from 'app/shared/model/cliente.model';

export interface IAreaCliente {
  id?: number;
  nome?: string;
  propostas?: IProposta[];
  cliente?: ICliente;
}

export const defaultValue: Readonly<IAreaCliente> = {};
