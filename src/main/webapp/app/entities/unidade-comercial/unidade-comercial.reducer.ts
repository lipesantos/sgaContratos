import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUnidadeComercial, defaultValue } from 'app/shared/model/unidade-comercial.model';

export const ACTION_TYPES = {
  FETCH_UNIDADECOMERCIAL_LIST: 'unidadeComercial/FETCH_UNIDADECOMERCIAL_LIST',
  FETCH_UNIDADECOMERCIAL: 'unidadeComercial/FETCH_UNIDADECOMERCIAL',
  CREATE_UNIDADECOMERCIAL: 'unidadeComercial/CREATE_UNIDADECOMERCIAL',
  UPDATE_UNIDADECOMERCIAL: 'unidadeComercial/UPDATE_UNIDADECOMERCIAL',
  DELETE_UNIDADECOMERCIAL: 'unidadeComercial/DELETE_UNIDADECOMERCIAL',
  RESET: 'unidadeComercial/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUnidadeComercial>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type UnidadeComercialState = Readonly<typeof initialState>;

// Reducer

export default (state: UnidadeComercialState = initialState, action): UnidadeComercialState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_UNIDADECOMERCIAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_UNIDADECOMERCIAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_UNIDADECOMERCIAL):
    case REQUEST(ACTION_TYPES.UPDATE_UNIDADECOMERCIAL):
    case REQUEST(ACTION_TYPES.DELETE_UNIDADECOMERCIAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_UNIDADECOMERCIAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_UNIDADECOMERCIAL):
    case FAILURE(ACTION_TYPES.CREATE_UNIDADECOMERCIAL):
    case FAILURE(ACTION_TYPES.UPDATE_UNIDADECOMERCIAL):
    case FAILURE(ACTION_TYPES.DELETE_UNIDADECOMERCIAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_UNIDADECOMERCIAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_UNIDADECOMERCIAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_UNIDADECOMERCIAL):
    case SUCCESS(ACTION_TYPES.UPDATE_UNIDADECOMERCIAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_UNIDADECOMERCIAL):
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

const apiUrl = 'api/unidade-comercials';

// Actions

export const getEntities: ICrudGetAllAction<IUnidadeComercial> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_UNIDADECOMERCIAL_LIST,
  payload: axios.get<IUnidadeComercial>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IUnidadeComercial> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_UNIDADECOMERCIAL,
    payload: axios.get<IUnidadeComercial>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUnidadeComercial> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_UNIDADECOMERCIAL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUnidadeComercial> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_UNIDADECOMERCIAL,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUnidadeComercial> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_UNIDADECOMERCIAL,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
