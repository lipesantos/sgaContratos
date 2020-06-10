import { Moment } from 'moment';
import { IEvento } from 'app/shared/model/evento.model';
import { INegociacao } from 'app/shared/model/negociacao.model';
import { IUnidadeComercial } from 'app/shared/model/unidade-comercial.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { IAreaCliente } from 'app/shared/model/area-cliente.model';
import { TipoProposta } from 'app/shared/model/enumerations/tipo-proposta.model';

export interface IProposta {
  id?: number;
  tipo?: TipoProposta;
  dataInicio?: string;
  dataFim?: string;
  referencia?: string;
  descricaoContrato?: string;
  descricaoProposta?: string;
  valorInicial?: number;
  eventos?: IEvento[];
  negociacoes?: INegociacao[];
  unidadeComercial?: IUnidadeComercial;
  cliente?: ICliente;
  areaCliente?: IAreaCliente;
}

export const defaultValue: Readonly<IProposta> = {};
