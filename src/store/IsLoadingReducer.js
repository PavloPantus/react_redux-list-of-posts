const ACTION_TYPE_SET_IS_LOADING = 'SET_IS_LOADING';

export const setIsLoading = isLoading => ({
  type: ACTION_TYPE_SET_IS_LOADING,
  isLoading,
});

export const getIsLoading = state => state.isLoading;

const isLoadingReducer = (isLoading = false, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_IS_LOADING: return action.isLoading;

    default:
      return isLoading;
  }
};

export default isLoadingReducer;
