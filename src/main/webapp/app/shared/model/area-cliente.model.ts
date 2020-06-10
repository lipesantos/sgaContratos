import { ICliente } from 'app/shared/model/cliente.model';

export interface IAreaCliente {
  id?: number;
  nome?: string;
  cliente?: ICliente;
}

export const defaultValue: Readonly<IAreaCliente> = {};
