import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './proposta.reducer';
import { IProposta } from 'app/shared/model/proposta.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IPropostaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Proposta = (props: IPropostaProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { propostaList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="proposta-heading">
        <Translate contentKey="sgaContratosApp.proposta.home.title">Propostas</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sgaContratosApp.proposta.home.createLabel">Create new Proposta</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {propostaList && propostaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('tipo')}>
                  <Translate contentKey="sgaContratosApp.proposta.tipo">Tipo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataInicio')}>
                  <Translate contentKey="sgaContratosApp.proposta.dataInicio">Data Inicio</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataFim')}>
                  <Translate contentKey="sgaContratosApp.proposta.dataFim">Data Fim</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('referencia')}>
                  <Translate contentKey="sgaContratosApp.proposta.referencia">Referencia</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('descricaoContrato')}>
                  <Translate contentKey="sgaContratosApp.proposta.descricaoContrato">Descricao Contrato</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('descricaoProposta')}>
                  <Translate contentKey="sgaContratosApp.proposta.descricaoProposta">Descricao Proposta</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('valorInicial')}>
                  <Translate contentKey="sgaContratosApp.proposta.valorInicial">Valor Inicial</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sgaContratosApp.proposta.unidadeComercial">Unidade Comercial</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sgaContratosApp.proposta.cliente">Cliente</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="sgaContratosApp.proposta.areaCliente">Area Cliente</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {propostaList.map((proposta, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${proposta.id}`} color="link" size="sm">
                      {proposta.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`sgaContratosApp.TipoProposta.${proposta.tipo}`} />
                  </td>
                  <td>{proposta.dataInicio ? <TextFormat type="date" value={proposta.dataInicio} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{proposta.dataFim ? <TextFormat type="date" value={proposta.dataFim} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{proposta.referencia}</td>
                  <td>{proposta.descricaoContrato}</td>
                  <td>{proposta.descricaoProposta}</td>
                  <td>{proposta.valorInicial}</td>
                  <td>
                    {proposta.unidadeComercial ? (
                      <Link to={`unidade-comercial/${proposta.unidadeComercial.id}`}>{proposta.unidadeComercial.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{proposta.cliente ? <Link to={`cliente/${proposta.cliente.id}`}>{proposta.cliente.id}</Link> : ''}</td>
                  <td>
                    {proposta.areaCliente ? <Link to={`area-cliente/${proposta.areaCliente.id}`}>{proposta.areaCliente.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${proposta.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${proposta.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${proposta.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
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
              <Translate contentKey="sgaContratosApp.proposta.home.notFound">No Propostas found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={propostaList && propostaList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ proposta }: IRootState) => ({
  propostaList: proposta.entities,
  loading: proposta.loading,
  totalItems: proposta.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Proposta);