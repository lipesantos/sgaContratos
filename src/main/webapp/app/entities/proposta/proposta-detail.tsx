import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './proposta.reducer';
import { IProposta } from 'app/shared/model/proposta.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPropostaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PropostaDetail = (props: IPropostaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { propostaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sgaContratosApp.proposta.detail.title">Proposta</Translate> [<b>{propostaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="tipo">
              <Translate contentKey="sgaContratosApp.proposta.tipo">Tipo</Translate>
            </span>
          </dt>
          <dd>{propostaEntity.tipo}</dd>
          <dt>
            <span id="dataInicio">
              <Translate contentKey="sgaContratosApp.proposta.dataInicio">Data Inicio</Translate>
            </span>
          </dt>
          <dd>
            {propostaEntity.dataInicio ? <TextFormat value={propostaEntity.dataInicio} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="dataFim">
              <Translate contentKey="sgaContratosApp.proposta.dataFim">Data Fim</Translate>
            </span>
          </dt>
          <dd>{propostaEntity.dataFim ? <TextFormat value={propostaEntity.dataFim} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="referencia">
              <Translate contentKey="sgaContratosApp.proposta.referencia">Referencia</Translate>
            </span>
          </dt>
          <dd>{propostaEntity.referencia}</dd>
          <dt>
            <span id="descricaoContrato">
              <Translate contentKey="sgaContratosApp.proposta.descricaoContrato">Descricao Contrato</Translate>
            </span>
          </dt>
          <dd>{propostaEntity.descricaoContrato}</dd>
          <dt>
            <span id="descricaoProposta">
              <Translate contentKey="sgaContratosApp.proposta.descricaoProposta">Descricao Proposta</Translate>
            </span>
          </dt>
          <dd>{propostaEntity.descricaoProposta}</dd>
          <dt>
            <span id="valorInicial">
              <Translate contentKey="sgaContratosApp.proposta.valorInicial">Valor Inicial</Translate>
            </span>
          </dt>
          <dd>{propostaEntity.valorInicial}</dd>
          <dt>
            <Translate contentKey="sgaContratosApp.proposta.negociacoes">Negociacoes</Translate>
          </dt>
          <dd>
            {propostaEntity.negociacoes
              ? propostaEntity.negociacoes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {propostaEntity.negociacoes && i === propostaEntity.negociacoes.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="sgaContratosApp.proposta.unidadeComercial">Unidade Comercial</Translate>
          </dt>
          <dd>{propostaEntity.unidadeComercial ? propostaEntity.unidadeComercial.id : ''}</dd>
          <dt>
            <Translate contentKey="sgaContratosApp.proposta.cliente">Cliente</Translate>
          </dt>
          <dd>{propostaEntity.cliente ? propostaEntity.cliente.id : ''}</dd>
          <dt>
            <Translate contentKey="sgaContratosApp.proposta.areaCliente">Area Cliente</Translate>
          </dt>
          <dd>{propostaEntity.areaCliente ? propostaEntity.areaCliente.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/proposta" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/proposta/${propostaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ proposta }: IRootState) => ({
  propostaEntity: proposta.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PropostaDetail);
