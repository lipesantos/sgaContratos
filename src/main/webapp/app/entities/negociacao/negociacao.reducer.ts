import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INegociacao, defaultValue } from 'app/shared/model/negociacao.model';

export const ACTION_TYPES = {
  FETCH_NEGOCIACAO_LIST: 'negociacao/FETCH_NEGOCIACAO_LIST',
  FETCH_NEGOCIACAO: 'negociacao/FETCH_NEGOCIACAO',
  CREATE_NEGOCIACAO: 'negociacao/CREATE_NEGOCIACAO',
  UPDATE_NEGOCIACAO: 'negociacao/UPDATE_NEGOCIACAO',
  DELETE_NEGOCIACAO: 'negociacao/DELETE_NEGOCIACAO',
  RESET: 'negociacao/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INegociacao>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type NegociacaoState = Readonly<typeof initialState>;

// Reducer

export default (state: NegociacaoState = initialState, action): NegociacaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NEGOCIACAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NEGOCIACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_NEGOCIACAO):
    case REQUEST(ACTION_TYPES.UPDATE_NEGOCIACAO):
    case REQUEST(ACTION_TYPES.DELETE_NEGOCIACAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_NEGOCIACAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NEGOCIACAO):
    case FAILURE(ACTION_TYPES.CREATE_NEGOCIACAO):
    case FAILURE(ACTION_TYPES.UPDATE_NEGOCIACAO):
    case FAILURE(ACTION_TYPES.DELETE_NEGOCIACAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_NEGOCIACAO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_NEGOCIACAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_NEGOCIACAO):
    case SUCCESS(ACTION_TYPES.UPDATE_NEGOCIACAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_NEGOCIACAO):
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

const apiUrl = 'api/negociacaos';

// Actions

export const getEntities: ICrudGetAllAction<INegociacao> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NEGOCIACAO_LIST,
  payload: axios.get<INegociacao>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<INegociacao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NEGOCIACAO,
    payload: axios.get<INegociacao>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<INegociacao> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NEGOCIACAO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INegociacao> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NEGOCIACAO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<INegociacao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NEGOCIACAO,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
