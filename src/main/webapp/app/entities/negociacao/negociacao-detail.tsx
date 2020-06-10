import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './negociacao.reducer';
import { INegociacao } from 'app/shared/model/negociacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INegociacaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NegociacaoDetail = (props: INegociacaoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { negociacaoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sgaContratosApp.negociacao.detail.title">Negociacao</Translate> [<b>{negociacaoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="data">
              <Translate contentKey="sgaContratosApp.negociacao.data">Data</Translate>
            </span>
          </dt>
          <dd>{negociacaoEntity.data ? <TextFormat value={negociacaoEntity.data} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="descricao">
              <Translate contentKey="sgaContratosApp.negociacao.descricao">Descricao</Translate>
            </span>
          </dt>
          <dd>{negociacaoEntity.descricao}</dd>
          <dt>
            <Translate contentKey="sgaContratosApp.negociacao.propostas">Propostas</Translate>
          </dt>
          <dd>
            {negociacaoEntity.propostas
              ? negociacaoEntity.propostas.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {negociacaoEntity.propostas && i === negociacaoEntity.propostas.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="sgaContratosApp.negociacao.cliente">Cliente</Translate>
          </dt>
          <dd>{negociacaoEntity.cliente ? negociacaoEntity.cliente.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/negociacao" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/negociacao/${negociacaoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ negociacao }: IRootState) => ({
  negociacaoEntity: negociacao.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NegociacaoDetail);
