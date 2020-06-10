import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './cliente.reducer';
import { ICliente } from 'app/shared/model/cliente.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClienteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ClienteUpdate = (props: IClienteUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { clienteEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/cliente' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...clienteEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sgaContratosApp.cliente.home.createOrEditLabel">
            <Translate contentKey="sgaContratosApp.cliente.home.createOrEditLabel">Create or edit a Cliente</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : clienteEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="cliente-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="cliente-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="cnpjLabel" for="cliente-cnpj">
                  <Translate contentKey="sgaContratosApp.cliente.cnpj">Cnpj</Translate>
                </Label>
                <AvField id="cliente-cnpj" type="string" className="form-control" name="cnpj" />
              </AvGroup>
              <AvGroup>
                <Label id="razaoSocialLabel" for="cliente-razaoSocial">
                  <Translate contentKey="sgaContratosApp.cliente.razaoSocial">Razao Social</Translate>
                </Label>
                <AvField id="cliente-razaoSocial" type="text" name="razaoSocial" />
              </AvGroup>
              <AvGroup>
                <Label id="nomeFantasiaLabel" for="cliente-nomeFantasia">
                  <Translate contentKey="sgaContratosApp.cliente.nomeFantasia">Nome Fantasia</Translate>
                </Label>
                <AvField id="cliente-nomeFantasia" type="text" name="nomeFantasia" />
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="cliente-postalCode">
                  <Translate contentKey="sgaContratosApp.cliente.postalCode">Postal Code</Translate>
                </Label>
                <AvField id="cliente-postalCode" type="text" name="postalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="cliente-city">
                  <Translate contentKey="sgaContratosApp.cliente.city">City</Translate>
                </Label>
                <AvField id="cliente-city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="stateProvinceLabel" for="cliente-stateProvince">
                  <Translate contentKey="sgaContratosApp.cliente.stateProvince">State Province</Translate>
                </Label>
                <AvField id="cliente-stateProvince" type="text" name="stateProvince" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/cliente" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  clienteEntity: storeState.cliente.entity,
  loading: storeState.cliente.loading,
  updating: storeState.cliente.updating,
  updateSuccess: storeState.cliente.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClienteUpdate);
