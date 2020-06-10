import { IAreaCliente } from 'app/shared/model/area-cliente.model';
import { INegociacao } from 'app/shared/model/negociacao.model';

export interface ICliente {
  id?: number;
  cnpj?: number;
  razaoSocial?: string;
  nomeFantasia?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  areaClientes?: IAreaCliente[];
  negociacaos?: INegociacao[];
}

export const defaultValue: Readonly<ICliente> = {};
