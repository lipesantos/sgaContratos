import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './unidade-comercial.reducer';
import { IUnidadeComercial } from 'app/shared/model/unidade-comercial.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUnidadeComercialDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UnidadeComercialDetail = (props: IUnidadeComercialDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { unidadeComercialEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sgaContratosApp.unidadeComercial.detail.title">UnidadeComercial</Translate> [
          <b>{unidadeComercialEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="cnpj">
              <Translate contentKey="sgaContratosApp.unidadeComercial.cnpj">Cnpj</Translate>
            </span>
          </dt>
          <dd>{unidadeComercialEntity.cnpj}</dd>
          <dt>
            <span id="razaoSocial">
              <Translate contentKey="sgaContratosApp.unidadeComercial.razaoSocial">Razao Social</Translate>
            </span>
          </dt>
          <dd>{unidadeComercialEntity.razaoSocial}</dd>
        </dl>
        <Button tag={Link} to="/unidade-comercial" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/unidade-comercial/${unidadeComercialEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ unidadeComercial }: IRootState) => ({
  unidadeComercialEntity: unidadeComercial.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeComercialDetail);
