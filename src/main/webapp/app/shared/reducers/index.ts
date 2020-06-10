import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
import sessions, { SessionsState } from 'app/modules/account/sessions/sessions.reducer';
// prettier-ignore
import unidadeComercial, {
  UnidadeComercialState
} from 'app/entities/unidade-comercial/unidade-comercial.reducer';
// prettier-ignore
import cliente, {
  ClienteState
} from 'app/entities/cliente/cliente.reducer';
// prettier-ignore
import areaCliente, {
  AreaClienteState
} from 'app/entities/area-cliente/area-cliente.reducer';
// prettier-ignore
import proposta, {
  PropostaState
} from 'app/entities/proposta/proposta.reducer';
// prettier-ignore
import evento, {
  EventoState
} from 'app/entities/evento/evento.reducer';
// prettier-ignore
import negociacao, {
  NegociacaoState
} from 'app/entities/negociacao/negociacao.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly sessions: SessionsState;
  readonly unidadeComercial: UnidadeComercialState;
  readonly cliente: ClienteState;
  readonly areaCliente: AreaClienteState;
  readonly proposta: PropostaState;
  readonly evento: EventoState;
  readonly negociacao: NegociacaoState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  sessions,
  unidadeComercial,
  cliente,
  areaCliente,
  proposta,
  evento,
  negociacao,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
