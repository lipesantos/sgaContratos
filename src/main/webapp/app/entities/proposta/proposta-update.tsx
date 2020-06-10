import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { INegociacao } from 'app/shared/model/negociacao.model';
import { getEntities as getNegociacaos } from 'app/entities/negociacao/negociacao.reducer';
import { IUnidadeComercial } from 'app/shared/model/unidade-comercial.model';
import { getEntities as getUnidadeComercials } from 'app/entities/unidade-comercial/unidade-comercial.reducer';
import { ICliente } from 'app/shared/model/cliente.model';
import { getEntities as getClientes } from 'app/entities/cliente/cliente.reducer';
import { IAreaCliente } from 'app/shared/model/area-cliente.model';
import { getEntities as getAreaClientes } from 'app/entities/area-cliente/area-cliente.reducer';
import { getEntity, updateEntity, createEntity, reset } from './proposta.reducer';
import { IProposta } from 'app/shared/model/proposta.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPropostaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PropostaUpdate = (props: IPropostaUpdateProps) => {
  const [idsnegociacoes, setIdsnegociacoes] = useState([]);
  const [unidadeComercialId, setUnidadeComercialId] = useState('0');
  const [clienteId, setClienteId] = useState('0');
  const [areaClienteId, setAreaClienteId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { propostaEntity, negociacaos, unidadeComercials, clientes, areaClientes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/proposta' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getNegociacaos();
    props.getUnidadeComercials();
    props.getClientes();
    props.getAreaClientes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.dataInicio = convertDateTimeToServer(values.dataInicio);
    values.dataFim = convertDateTimeToServer(values.dataFim);

    if (errors.length === 0) {
      const entity = {
        ...propostaEntity,
        ...values,
        negociacoes: mapIdList(values.negociacoes),
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
          <h2 id="sgaContratosApp.proposta.home.createOrEditLabel">
            <Translate contentKey="sgaContratosApp.proposta.home.createOrEditLabel">Create or edit a Proposta</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : propostaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="proposta-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="proposta-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="tipoLabel" for="proposta-tipo">
                  <Translate contentKey="sgaContratosApp.proposta.tipo">Tipo</Translate>
                </Label>
                <AvInput
                  id="proposta-tipo"
                  type="select"
                  className="form-control"
                  name="tipo"
                  value={(!isNew && propostaEntity.tipo) || 'PROJETO'}
                >
                  <option value="PROJETO">{translate('sgaContratosApp.TipoProposta.PROJETO')}</option>
                  <option value="ALOCACAO">{translate('sgaContratosApp.TipoProposta.ALOCACAO')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="dataInicioLabel" for="proposta-dataInicio">
                  <Translate contentKey="sgaContratosApp.proposta.dataInicio">Data Inicio</Translate>
                </Label>
                <AvInput
                  id="proposta-dataInicio"
                  type="datetime-local"
                  className="form-control"
                  name="dataInicio"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.propostaEntity.dataInicio)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dataFimLabel" for="proposta-dataFim">
                  <Translate contentKey="sgaContratosApp.proposta.dataFim">Data Fim</Translate>
                </Label>
                <AvInput
                  id="proposta-dataFim"
                  type="datetime-local"
                  className="form-control"
                  name="dataFim"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.propostaEntity.dataFim)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="referenciaLabel" for="proposta-referencia">
                  <Translate contentKey="sgaContratosApp.proposta.referencia">Referencia</Translate>
                </Label>
                <AvField id="proposta-referencia" type="text" name="referencia" />
              </AvGroup>
              <AvGroup>
                <Label id="descricaoContratoLabel" for="proposta-descricaoContrato">
                  <Translate contentKey="sgaContratosApp.proposta.descricaoContrato">Descricao Contrato</Translate>
                </Label>
                <AvField id="proposta-descricaoContrato" type="text" name="descricaoContrato" />
              </AvGroup>
              <AvGroup>
                <Label id="descricaoPropostaLabel" for="proposta-descricaoProposta">
                  <Translate contentKey="sgaContratosApp.proposta.descricaoProposta">Descricao Proposta</Translate>
                </Label>
                <AvField id="proposta-descricaoProposta" type="text" name="descricaoProposta" />
              </AvGroup>
              <AvGroup>
                <Label id="valorInicialLabel" for="proposta-valorInicial">
                  <Translate contentKey="sgaContratosApp.proposta.valorInicial">Valor Inicial</Translate>
                </Label>
                <AvField id="proposta-valorInicial" type="text" name="valorInicial" />
              </AvGroup>
              <AvGroup>
                <Label for="proposta-negociacoes">
                  <Translate contentKey="sgaContratosApp.proposta.negociacoes">Negociacoes</Translate>
                </Label>
                <AvInput
                  id="proposta-negociacoes"
                  type="select"
                  multiple
                  className="form-control"
                  name="negociacoes"
                  value={propostaEntity.negociacoes && propostaEntity.negociacoes.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {negociacaos
                    ? negociacaos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="proposta-unidadeComercial">
                  <Translate contentKey="sgaContratosApp.proposta.unidadeComercial">Unidade Comercial</Translate>
                </Label>
                <AvInput id="proposta-unidadeComercial" type="select" className="form-control" name="unidadeComercial.id">
                  <option value="" key="0" />
                  {unidadeComercials
                    ? unidadeComercials.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="proposta-cliente">
                  <Translate contentKey="sgaContratosApp.proposta.cliente">Cliente</Translate>
                </Label>
                <AvInput id="proposta-cliente" type="select" className="form-control" name="cliente.id">
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
              <AvGroup>
                <Label for="proposta-areaCliente">
                  <Translate contentKey="sgaContratosApp.proposta.areaCliente">Area Cliente</Translate>
                </Label>
                <AvInput id="proposta-areaCliente" type="select" className="form-control" name="areaCliente.id">
                  <option value="" key="0" />
                  {areaClientes
                    ? areaClientes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/proposta" replace color="info">
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
  negociacaos: storeState.negociacao.entities,
  unidadeComercials: storeState.unidadeComercial.entities,
  clientes: storeState.cliente.entities,
  areaClientes: storeState.areaCliente.entities,
  propostaEntity: storeState.proposta.entity,
  loading: storeState.proposta.loading,
  updating: storeState.proposta.updating,
  updateSuccess: storeState.proposta.updateSuccess,
});

const mapDispatchToProps = {
  getNegociacaos,
  getUnidadeComercials,
  getClientes,
  getAreaClientes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PropostaUpdate);
