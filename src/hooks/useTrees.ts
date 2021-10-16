import {useCallback} from 'react';

// HOOKS
import useRestRequest from './useRestRequest';

export  function useTrees() {
  // HOOKS
  const {loading: requestTreesLoading, get: getRequestTrees, data: requestTrees} =
    useRestRequest();

  const newSession = useCallback(
     async () => {
      
      return await getRequestTrees('/Tree');
    },
    [getRequestTrees],
  );

  return {
    getRequestTrees,
    requestTrees,
    requestTreesLoading,
  };
}
