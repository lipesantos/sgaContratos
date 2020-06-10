import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Negociacao from './negociacao';
import NegociacaoDetail from './negociacao-detail';
import NegociacaoUpdate from './negociacao-update';
import NegociacaoDeleteDialog from './negociacao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={NegociacaoDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NegociacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NegociacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NegociacaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Negociacao} />
    </Switch>
  </>
);

export default Routes;
