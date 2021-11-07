import React, {useMemo, useReducer, useCallback, useContext} from 'react';
import {AxiosError} from 'axios';
import api from '../services/api';

// STORE
import {storeData, getData} from '../utils/AsyncStorage';

// UTILS
import {isAuthorizationError, isForbiddenError} from '../utils/ErrorStatus';
import processFetchError from '../utils/generalFetchErrorHandler';

// ENUMS
import {ErrorKey} from '../enums/ErrorKey';

// CONTEXT
import {AuthContext} from '../services/context';

const types = {
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

interface State {
  data: any | null;
  loading: boolean;
  error: AxiosError | null;
}

interface Action {
  type: string;
  data?: any;
  error?: any;
}

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

type useRestRequestOptions = {
  skipForbiddenError?: boolean;
};

function useRestRequest(
  url = '',
  initialData: any = null,
  options: useRestRequestOptions = {},
) {
  const {signOut} = useContext(AuthContext);

  const initialState = {
    data: initialData,
    loading: false,
    error: null,
  };

  const _skipForbiddenError = options.skipForbiddenError ?? false;

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case types.FETCHING: {
        return {...state, loading: true, error: null};
      }

      case types.SUCCESS: {
        const {data} = action;
        return {...state, data, loading: false};
      }

      case types.ERROR: {
        const {error} = action;
        return {...state, data: initialState.data, error, loading: false};
      }

      default: {
        return state;
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
 
  const bearerToken = async() => {
   return await getData('token');
  };


  const defaultOptions = useMemo(
    async() => ({
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }),
    [bearerToken],
  );

  const handleFetch = useCallback(
    async function handleFetch(
      fetcher: () => Promise<any>,
      skipForbiddenError = false,
      mockData: any = null,
    ) {
      dispatch({type: types.FETCHING});
      try {
        if (!mockData) {
          const {data} = await fetcher();
          dispatch({type: types.SUCCESS, data: data});
          return data;
        }
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(mockData);
            dispatch({type: types.SUCCESS, data: mockData});
          }, 2000);
        });
      } catch (error:any) {
        const signOutForbidden =
          isAuthorizationError(error) ||
          (isForbiddenError(error) &&
            error?.response?.data?.errorKey !== ErrorKey.TOKEN_EXPIRED &&
            !(skipForbiddenError || _skipForbiddenError));
        if (signOutForbidden) {
          await signOut();
        }
        throw processFetchError(error);
      }
    },
    [_skipForbiddenError, signOut],
  );

  const get = useCallback(
    function get(
      _url: string = url,
      options: any = {},
      mockData: any = null,
      skipForbiddenError = false,
    ): Promise<any> {
      const defaultHeaders = {
        headers: {
          ...defaultOptions.headers,
          ...options,
        },
      };
      return handleFetch(
        () => api.get(_url, {...defaultHeaders}),
        skipForbiddenError,
        mockData,
      );
    },
    [url, defaultOptions.headers, handleFetch],
  );

  const post = useCallback(
    function post(
      data: any,
      _url: string = url,
      options: any = {},
      mockData: any = null,
      skipForbiddenError = false,
    ): Promise<any> {
      const defaultHeaders = {
        headers: {
          ...defaultOptions.headers,
          ...options,
        },
      };
      return handleFetch(
        () => api.post(_url, data, {...defaultHeaders}),
        skipForbiddenError,
        mockData,
      );
    },
    [url, defaultOptions.headers, handleFetch],
  );

  const put = useCallback(
    function put(
      data: any,
      _url: string = url,
      options: any = {},
      skipForbiddenError = false,
      mockData: any = null,
    ): Promise<any> {
      return handleFetch(
        () => api.put(_url, data, {...defaultOptions, ...options}),
        skipForbiddenError,
        mockData,
      );
    },
    [url, handleFetch, defaultOptions],
  );

  const _delete = useCallback(
    (_url: string = url): Promise<any> => {
      return handleFetch(() => api.delete(_url, defaultOptions));
    },
    [defaultOptions, handleFetch, url],
  );

  return {
    get,
    post,
    put,
    delete: _delete,
    data: state.data,
    error: state.error,
    loading: state.loading,
  };
}

export default useRestRequest;
