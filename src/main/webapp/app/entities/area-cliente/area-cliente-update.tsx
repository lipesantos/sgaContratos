import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICliente } from 'app/shared/model/cliente.model';
import { getEntities as getClientes } from 'app/entities/cliente/cliente.reducer';
import { getEntity, updateEntity, createEntity, reset } from './area-cliente.reducer';
import { IAreaCliente } from 'app/shared/model/area-cliente.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAreaClienteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AreaClienteUpdate = (props: IAreaClienteUpdateProps) => {
  const [clienteId, setClienteId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { areaClienteEntity, clientes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/area-cliente');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getClientes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...areaClienteEntity,
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
          <h2 id="sgaContratosApp.areaCliente.home.createOrEditLabel">
            <Translate contentKey="sgaContratosApp.areaCliente.home.createOrEditLabel">Create or edit a AreaCliente</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : areaClienteEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="area-cliente-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="area-cliente-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomeLabel" for="area-cliente-nome">
                  <Translate contentKey="sgaContratosApp.areaCliente.nome">Nome</Translate>
                </Label>
                <AvField
                  id="area-cliente-nome"
                  type="text"
                  name="nome"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="area-cliente-cliente">
                  <Translate contentKey="sgaContratosApp.areaCliente.cliente">Cliente</Translate>
                </Label>
                <AvInput id="area-cliente-cliente" type="select" className="form-control" name="cliente.id">
                  <option value="" key="0" />
                  {clientes
                    ? clientes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/area-cliente" replace color="info">
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
  clientes: storeState.cliente.entities,
  areaClienteEntity: storeState.areaCliente.entity,
  loading: storeState.areaCliente.loading,
  updating: storeState.areaCliente.updating,
  updateSuccess: storeState.areaCliente.updateSuccess,
});

const mapDispatchToProps = {
  getClientes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AreaClienteUpdate);
