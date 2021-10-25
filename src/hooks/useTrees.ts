import {useCallback} from 'react';

// HOOKS
import useRestRequest from './useRestRequest';

export  function useTrees() {
  // HOOKS
  const {loading: requestTreesLoading, get: requestGetTrees, data: requestTrees} =
    useRestRequest();
  const {loading: requestTreeLoading, get: requestGetTree, data: requestTree} = useRestRequest();
  const {loading: requestUploadImageLoading, post: requestUploadImage, data: uploadImage} = useRestRequest();
  const {loading: requestCreateTreeLoading, data: createTree, post: requestCreateTree} = useRestRequest();

  const getRequestTrees = useCallback(
     async () => {
      
      return await requestGetTrees('/Tree');
    },
    [requestGetTrees],
  );

  const getRequestTree = useCallback(async (id: number) => {
    return await requestGetTree(`Tree/${id}`);
  }, [requestGetTree])

  const postRequestImage = useCallback(async (data: any) => {
    return await requestUploadImage(data, 'files', {
      headers: {
        'Content-Type': 'multipart/form-data;',
      }
    })
  }, [requestUploadImage])

  const postRequestCreateTree = useCallback(async (name: string, description: string, latitude: number, longitude: number, avatarId: number) => {
    const payload = {
      name,
      description,
      latitude,
      longitude,
      avatarId
    }
    return await requestCreateTree(payload, 'Tree');
  }, [requestCreateTree])

  return {
    getRequestTrees,
    requestTrees,
    requestTreesLoading,
    getRequestTree,
    requestTree,
    requestTreeLoading,
    postRequestImage,
    requestUploadImageLoading,
    postRequestCreateTree,
    requestCreateTreeLoading,
    createTree
  };
}
