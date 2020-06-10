import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './negociacao.reducer';
import { INegociacao } from 'app/shared/model/negociacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INegociacaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Negociacao = (props: INegociacaoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { negociacaoList, match, loading } = props;
  return (
    <div>
      <h2 id="negociacao-heading">
        <Translate contentKey="sgaContratosApp.negociacao.home.title">Negociacaos</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sgaContratosApp.negociacao.home.createLabel">Create new Negociacao</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {negociacaoList && negociacaoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sgaContratosApp.negociacao.data">Data</Translate>
                </th>
                <th>
                  <Translate contentKey="sgaContratosApp.negociacao.descricao">Descricao</Translate>
                </th>
                <th>
                  <Translate contentKey="sgaContratosApp.negociacao.cliente">Cliente</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {negociacaoList.map((negociacao, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${negociacao.id}`} color="link" size="sm">
                      {negociacao.id}
                    </Button>
                  </td>
                  <td>{negociacao.data ? <TextFormat type="date" value={negociacao.data} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{negociacao.descricao}</td>
                  <td>{negociacao.cliente ? <Link to={`cliente/${negociacao.cliente.id}`}>{negociacao.cliente.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${negociacao.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${negociacao.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${negociacao.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="sgaContratosApp.negociacao.home.notFound">No Negociacaos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ negociacao }: IRootState) => ({
  negociacaoList: negociacao.entities,
  loading: negociacao.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Negociacao);
