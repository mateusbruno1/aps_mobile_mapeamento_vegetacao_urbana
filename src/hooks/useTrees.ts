import {useCallback} from 'react';

// HOOKS
import useRestRequest from './useRestRequest';

export  function useTrees() {
  // HOOKS
  const {loading: requestTreesLoading, get: requestGetTrees, data: requestTrees} =
    useRestRequest();

  const getRequestTrees = useCallback(
     async () => {
      
      return await requestGetTrees('/Tree');
    },
    [requestGetTrees],
  );

  return {
    getRequestTrees,
    requestTrees,
    requestTreesLoading,
  };
}
