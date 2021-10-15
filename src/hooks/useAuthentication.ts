import {useCallback, useMemo, useReducer} from 'react';

// STORE
import {getData, storeData} from '../utils/AsyncStorage';

// HOOKS
import useRestRequest from './useRestRequest';

export  function useAuthentication() {
  // HOOKS
  const {loading: newSessionLoading, post: requestNewSession} =
    useRestRequest();

  const newSession = useCallback(
     async (email: string, password: string) => {
      const payload = {email, password};
      
      const newSession = await requestNewSession(payload,'/sessions');
    
      storeData('token',newSession.token);
      storeData('user',newSession.user);
      
    },
    [requestNewSession],
  );

  return {
    newSession,
    newSessionLoading,
  };
}
