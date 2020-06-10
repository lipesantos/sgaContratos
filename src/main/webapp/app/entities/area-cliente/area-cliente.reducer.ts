import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAreaCliente, defaultValue } from 'app/shared/model/area-cliente.model';

export const ACTION_TYPES = {
  FETCH_AREACLIENTE_LIST: 'areaCliente/FETCH_AREACLIENTE_LIST',
  FETCH_AREACLIENTE: 'areaCliente/FETCH_AREACLIENTE',
  CREATE_AREACLIENTE: 'areaCliente/CREATE_AREACLIENTE',
  UPDATE_AREACLIENTE: 'areaCliente/UPDATE_AREACLIENTE',
  DELETE_AREACLIENTE: 'areaCliente/DELETE_AREACLIENTE',
  RESET: 'areaCliente/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAreaCliente>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AreaClienteState = Readonly<typeof initialState>;

// Reducer

export default (state: AreaClienteState = initialState, action): AreaClienteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AREACLIENTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AREACLIENTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_AREACLIENTE):
    case REQUEST(ACTION_TYPES.UPDATE_AREACLIENTE):
    case REQUEST(ACTION_TYPES.DELETE_AREACLIENTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_AREACLIENTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AREACLIENTE):
    case FAILURE(ACTION_TYPES.CREATE_AREACLIENTE):
    case FAILURE(ACTION_TYPES.UPDATE_AREACLIENTE):
    case FAILURE(ACTION_TYPES.DELETE_AREACLIENTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_AREACLIENTE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_AREACLIENTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_AREACLIENTE):
    case SUCCESS(ACTION_TYPES.UPDATE_AREACLIENTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_AREACLIENTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/area-clientes';

// Actions

export const getEntities: ICrudGetAllAction<IAreaCliente> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AREACLIENTE_LIST,
  payload: axios.get<IAreaCliente>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAreaCliente> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AREACLIENTE,
    payload: axios.get<IAreaCliente>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAreaCliente> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AREACLIENTE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAreaCliente> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AREACLIENTE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAreaCliente> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AREACLIENTE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
