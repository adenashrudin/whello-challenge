export const initialState = {
  loading: false,
  codeNewInput: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };

    case "SET_CODE":
      return {
        ...state,
        codeNewInput: action.codeNewInput,
      };

    default:
      return state;
  }
};

export default reducer;
