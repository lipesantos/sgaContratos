import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cliente.reducer';
import { ICliente } from 'app/shared/model/cliente.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClienteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ClienteDetail = (props: IClienteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { clienteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sgaContratosApp.cliente.detail.title">Cliente</Translate> [<b>{clienteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="cnpj">
              <Translate contentKey="sgaContratosApp.cliente.cnpj">Cnpj</Translate>
            </span>
          </dt>
          <dd>{clienteEntity.cnpj}</dd>
          <dt>
            <span id="razaoSocial">
              <Translate contentKey="sgaContratosApp.cliente.razaoSocial">Razao Social</Translate>
            </span>
          </dt>
          <dd>{clienteEntity.razaoSocial}</dd>
          <dt>
            <span id="nomeFantasia">
              <Translate contentKey="sgaContratosApp.cliente.nomeFantasia">Nome Fantasia</Translate>
            </span>
          </dt>
          <dd>{clienteEntity.nomeFantasia}</dd>
          <dt>
            <span id="postalCode">
              <Translate contentKey="sgaContratosApp.cliente.postalCode">Postal Code</Translate>
            </span>
          </dt>
          <dd>{clienteEntity.postalCode}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="sgaContratosApp.cliente.city">City</Translate>
            </span>
          </dt>
          <dd>{clienteEntity.city}</dd>
          <dt>
            <span id="stateProvince">
              <Translate contentKey="sgaContratosApp.cliente.stateProvince">State Province</Translate>
            </span>
          </dt>
          <dd>{clienteEntity.stateProvince}</dd>
        </dl>
        <Button tag={Link} to="/cliente" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cliente/${clienteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ cliente }: IRootState) => ({
  clienteEntity: cliente.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClienteDetail);
