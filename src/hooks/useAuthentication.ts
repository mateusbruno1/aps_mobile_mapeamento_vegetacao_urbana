import {useCallback, useContext} from 'react';
import api from '../services/api';

// STORE
import {getData, storeData} from '../utils/AsyncStorage';

// HOOKS
import useRestRequest from './useRestRequest';

// CONTEXT
import {AuthContext} from '../services/context';

export  function useAuthentication() {
  // CONTEXT
  const {signIn} = useContext(AuthContext);
  // HOOKS
  const {loading: newSessionLoading, post: requestNewSession} =
    useRestRequest();

  const newSession = useCallback(
     async (email: string, password: string) => {
      const payload = {email, password};
      
      const newSession = await requestNewSession(payload,'/sessions');
      
      await storeData('token',newSession.token);
      await storeData('user',newSession.user);
      signIn();
    },
    [requestNewSession],
  );

  return {
    newSession,
    newSessionLoading,
  };
}
