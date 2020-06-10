import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/unidade-comercial">
      <Translate contentKey="global.menu.entities.unidadeComercial" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cliente">
      <Translate contentKey="global.menu.entities.cliente" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/area-cliente">
      <Translate contentKey="global.menu.entities.areaCliente" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/proposta">
      <Translate contentKey="global.menu.entities.proposta" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/evento">
      <Translate contentKey="global.menu.entities.evento" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/negociacao">
      <Translate contentKey="global.menu.entities.negociacao" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
