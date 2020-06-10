import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProposta, defaultValue } from 'app/shared/model/proposta.model';

export const ACTION_TYPES = {
  FETCH_PROPOSTA_LIST: 'proposta/FETCH_PROPOSTA_LIST',
  FETCH_PROPOSTA: 'proposta/FETCH_PROPOSTA',
  CREATE_PROPOSTA: 'proposta/CREATE_PROPOSTA',
  UPDATE_PROPOSTA: 'proposta/UPDATE_PROPOSTA',
  DELETE_PROPOSTA: 'proposta/DELETE_PROPOSTA',
  RESET: 'proposta/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProposta>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type PropostaState = Readonly<typeof initialState>;

// Reducer

export default (state: PropostaState = initialState, action): PropostaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROPOSTA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROPOSTA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PROPOSTA):
    case REQUEST(ACTION_TYPES.UPDATE_PROPOSTA):
    case REQUEST(ACTION_TYPES.DELETE_PROPOSTA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PROPOSTA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROPOSTA):
    case FAILURE(ACTION_TYPES.CREATE_PROPOSTA):
    case FAILURE(ACTION_TYPES.UPDATE_PROPOSTA):
    case FAILURE(ACTION_TYPES.DELETE_PROPOSTA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROPOSTA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROPOSTA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROPOSTA):
    case SUCCESS(ACTION_TYPES.UPDATE_PROPOSTA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROPOSTA):
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

const apiUrl = 'api/propostas';

// Actions

export const getEntities: ICrudGetAllAction<IProposta> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PROPOSTA_LIST,
    payload: axios.get<IProposta>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IProposta> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROPOSTA,
    payload: axios.get<IProposta>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProposta> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROPOSTA,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProposta> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROPOSTA,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProposta> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROPOSTA,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
