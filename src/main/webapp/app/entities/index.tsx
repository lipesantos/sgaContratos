import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UnidadeComercial from './unidade-comercial';
import Cliente from './cliente';
import AreaCliente from './area-cliente';
import Proposta from './proposta';
import Evento from './evento';
import Negociacao from './negociacao';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}unidade-comercial`} component={UnidadeComercial} />
      <ErrorBoundaryRoute path={`${match.url}cliente`} component={Cliente} />
      <ErrorBoundaryRoute path={`${match.url}area-cliente`} component={AreaCliente} />
      <ErrorBoundaryRoute path={`${match.url}proposta`} component={Proposta} />
      <ErrorBoundaryRoute path={`${match.url}evento`} component={Evento} />
      <ErrorBoundaryRoute path={`${match.url}negociacao`} component={Negociacao} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
