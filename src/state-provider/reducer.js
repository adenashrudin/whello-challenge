export const initialState = {
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        loading: action.loading,
      };

    default:
      return state;
  }
};

export default reducer;
