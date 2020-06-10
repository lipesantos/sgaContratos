import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AreaCliente from './area-cliente';
import AreaClienteDetail from './area-cliente-detail';
import AreaClienteUpdate from './area-cliente-update';
import AreaClienteDeleteDialog from './area-cliente-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AreaClienteDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AreaClienteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AreaClienteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AreaClienteDetail} />
      <ErrorBoundaryRoute path={match.url} component={AreaCliente} />
    </Switch>
  </>
);

export default Routes;
