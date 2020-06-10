import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UnidadeComercial from './unidade-comercial';
import UnidadeComercialDetail from './unidade-comercial-detail';
import UnidadeComercialUpdate from './unidade-comercial-update';
import UnidadeComercialDeleteDialog from './unidade-comercial-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UnidadeComercialDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UnidadeComercialUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UnidadeComercialUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UnidadeComercialDetail} />
      <ErrorBoundaryRoute path={match.url} component={UnidadeComercial} />
    </Switch>
  </>
);

export default Routes;
