import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './area-cliente.reducer';
import { IAreaCliente } from 'app/shared/model/area-cliente.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAreaClienteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AreaClienteDetail = (props: IAreaClienteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { areaClienteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sgaContratosApp.areaCliente.detail.title">AreaCliente</Translate> [<b>{areaClienteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nome">
              <Translate contentKey="sgaContratosApp.areaCliente.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{areaClienteEntity.nome}</dd>
          <dt>
            <Translate contentKey="sgaContratosApp.areaCliente.cliente">Cliente</Translate>
          </dt>
          <dd>{areaClienteEntity.cliente ? areaClienteEntity.cliente.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/area-cliente" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/area-cliente/${areaClienteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ areaCliente }: IRootState) => ({
  areaClienteEntity: areaCliente.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AreaClienteDetail);
