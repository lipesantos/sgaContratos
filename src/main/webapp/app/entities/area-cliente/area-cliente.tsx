import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './area-cliente.reducer';
import { IAreaCliente } from 'app/shared/model/area-cliente.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAreaClienteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AreaCliente = (props: IAreaClienteProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { areaClienteList, match, loading } = props;
  return (
    <div>
      <h2 id="area-cliente-heading">
        <Translate contentKey="sgaContratosApp.areaCliente.home.title">Area Clientes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sgaContratosApp.areaCliente.home.createLabel">Create new Area Cliente</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {areaClienteList && areaClienteList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sgaContratosApp.areaCliente.nome">Nome</Translate>
                </th>
                <th>
                  <Translate contentKey="sgaContratosApp.areaCliente.cliente">Cliente</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {areaClienteList.map((areaCliente, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${areaCliente.id}`} color="link" size="sm">
                      {areaCliente.id}
                    </Button>
                  </td>
                  <td>{areaCliente.nome}</td>
                  <td>{areaCliente.cliente ? <Link to={`cliente/${areaCliente.cliente.id}`}>{areaCliente.cliente.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${areaCliente.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${areaCliente.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${areaCliente.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="sgaContratosApp.areaCliente.home.notFound">No Area Clientes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ areaCliente }: IRootState) => ({
  areaClienteList: areaCliente.entities,
  loading: areaCliente.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AreaCliente);
