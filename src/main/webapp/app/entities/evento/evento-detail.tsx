import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './evento.reducer';
import { IEvento } from 'app/shared/model/evento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EventoDetail = (props: IEventoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { eventoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sgaContratosApp.evento.detail.title">Evento</Translate> [<b>{eventoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="dataEmissao">
              <Translate contentKey="sgaContratosApp.evento.dataEmissao">Data Emissao</Translate>
            </span>
          </dt>
          <dd>{eventoEntity.dataEmissao ? <TextFormat value={eventoEntity.dataEmissao} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="dataVencimento">
              <Translate contentKey="sgaContratosApp.evento.dataVencimento">Data Vencimento</Translate>
            </span>
          </dt>
          <dd>
            {eventoEntity.dataVencimento ? <TextFormat value={eventoEntity.dataVencimento} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="descricao">
              <Translate contentKey="sgaContratosApp.evento.descricao">Descricao</Translate>
            </span>
          </dt>
          <dd>{eventoEntity.descricao}</dd>
          <dt>
            <span id="valor">
              <Translate contentKey="sgaContratosApp.evento.valor">Valor</Translate>
            </span>
          </dt>
          <dd>{eventoEntity.valor}</dd>
          <dt>
            <Translate contentKey="sgaContratosApp.evento.proposta">Proposta</Translate>
          </dt>
          <dd>{eventoEntity.proposta ? eventoEntity.proposta.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/evento" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/evento/${eventoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ evento }: IRootState) => ({
  eventoEntity: evento.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventoDetail);
