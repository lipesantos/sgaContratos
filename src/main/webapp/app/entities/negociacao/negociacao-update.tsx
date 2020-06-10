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
import { IProposta } from 'app/shared/model/proposta.model';
import { getEntities as getPropostas } from 'app/entities/proposta/proposta.reducer';
import { getEntity, updateEntity, createEntity, reset } from './negociacao.reducer';
import { INegociacao } from 'app/shared/model/negociacao.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INegociacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NegociacaoUpdate = (props: INegociacaoUpdateProps) => {
  const [clienteId, setClienteId] = useState('0');
  const [propostasId, setPropostasId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { negociacaoEntity, clientes, propostas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/negociacao');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getClientes();
    props.getPropostas();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.data = convertDateTimeToServer(values.data);

    if (errors.length === 0) {
      const entity = {
        ...negociacaoEntity,
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
          <h2 id="sgaContratosApp.negociacao.home.createOrEditLabel">
            <Translate contentKey="sgaContratosApp.negociacao.home.createOrEditLabel">Create or edit a Negociacao</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : negociacaoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="negociacao-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="negociacao-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dataLabel" for="negociacao-data">
                  <Translate contentKey="sgaContratosApp.negociacao.data">Data</Translate>
                </Label>
                <AvInput
                  id="negociacao-data"
                  type="datetime-local"
                  className="form-control"
                  name="data"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.negociacaoEntity.data)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descricaoLabel" for="negociacao-descricao">
                  <Translate contentKey="sgaContratosApp.negociacao.descricao">Descricao</Translate>
                </Label>
                <AvField id="negociacao-descricao" type="text" name="descricao" />
              </AvGroup>
              <AvGroup>
                <Label for="negociacao-cliente">
                  <Translate contentKey="sgaContratosApp.negociacao.cliente">Cliente</Translate>
                </Label>
                <AvInput id="negociacao-cliente" type="select" className="form-control" name="cliente.id">
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
              <Button tag={Link} id="cancel-save" to="/negociacao" replace color="info">
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
  propostas: storeState.proposta.entities,
  negociacaoEntity: storeState.negociacao.entity,
  loading: storeState.negociacao.loading,
  updating: storeState.negociacao.updating,
  updateSuccess: storeState.negociacao.updateSuccess,
});

const mapDispatchToProps = {
  getClientes,
  getPropostas,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NegociacaoUpdate);
