import {useCallback, useMemo, useReducer} from 'react';

// HOOKS
import useRestRequest from './useRestRequest';

// UTILS
import RemoveMask from '../utils/RemoveMask';

export  function useCreateUser() {
  // HOOKS
  const {data: createUser, loading: postCreateUserLoading, post: requestPostCreateUser} =
    useRestRequest();

  const postCreateUser = useCallback(
     async (name: string, email: string, phone: string, password: string) => {
      const formatedPhone = RemoveMask(phone)
      const payload = {name, email, phone: formatedPhone, password};
      
      return await requestPostCreateUser(payload,'/users');
    },
    [requestPostCreateUser],
  );

  return {
    createUser,
    postCreateUser,
    postCreateUserLoading,
  };
}
