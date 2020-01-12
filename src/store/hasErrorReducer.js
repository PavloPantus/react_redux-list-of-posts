/* eslint-disable no-shadow */
const SET_HAS_ERROR = 'SET_HAS_ERROR';

export const setHasError = value => ({
  type: SET_HAS_ERROR,
  hasError: value,
});

export const hasError = state => state.hasError;

const hasErrorReducer = (hasError = false, action) => {
  switch (action.type) {
    case SET_HAS_ERROR: return action.hasError;

    default: return hasError;
  }
};

export default hasErrorReducer;
