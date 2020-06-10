import { Moment } from 'moment';
import { IEvento } from 'app/shared/model/evento.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { IUnidadeComercial } from 'app/shared/model/unidade-comercial.model';
import { IAreaCliente } from 'app/shared/model/area-cliente.model';
import { INegociacao } from 'app/shared/model/negociacao.model';
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
  cliente?: ICliente;
  unidadeComercial?: IUnidadeComercial;
  areaCliente?: IAreaCliente;
  negociacoes?: INegociacao[];
}

export const defaultValue: Readonly<IProposta> = {};
