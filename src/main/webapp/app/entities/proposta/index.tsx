import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Proposta from './proposta';
import PropostaDetail from './proposta-detail';
import PropostaUpdate from './proposta-update';
import PropostaDeleteDialog from './proposta-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PropostaDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PropostaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PropostaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PropostaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Proposta} />
    </Switch>
  </>
);

export default Routes;
