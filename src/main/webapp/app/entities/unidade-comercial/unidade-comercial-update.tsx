import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './unidade-comercial.reducer';
import { IUnidadeComercial } from 'app/shared/model/unidade-comercial.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUnidadeComercialUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UnidadeComercialUpdate = (props: IUnidadeComercialUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { unidadeComercialEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/unidade-comercial');
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
        ...unidadeComercialEntity,
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
          <h2 id="sgaContratosApp.unidadeComercial.home.createOrEditLabel">
            <Translate contentKey="sgaContratosApp.unidadeComercial.home.createOrEditLabel">Create or edit a UnidadeComercial</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : unidadeComercialEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="unidade-comercial-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="unidade-comercial-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="cnpjLabel" for="unidade-comercial-cnpj">
                  <Translate contentKey="sgaContratosApp.unidadeComercial.cnpj">Cnpj</Translate>
                </Label>
                <AvField id="unidade-comercial-cnpj" type="string" className="form-control" name="cnpj" />
              </AvGroup>
              <AvGroup>
                <Label id="razaoSocialLabel" for="unidade-comercial-razaoSocial">
                  <Translate contentKey="sgaContratosApp.unidadeComercial.razaoSocial">Razao Social</Translate>
                </Label>
                <AvField id="unidade-comercial-razaoSocial" type="text" name="razaoSocial" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/unidade-comercial" replace color="info">
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
  unidadeComercialEntity: storeState.unidadeComercial.entity,
  loading: storeState.unidadeComercial.loading,
  updating: storeState.unidadeComercial.updating,
  updateSuccess: storeState.unidadeComercial.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeComercialUpdate);
