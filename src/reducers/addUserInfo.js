const DEFAULT_STATE = {};
const userReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_USER_INFO":
      return { ...state, ...payload };
    default:
      return state;
  }
};
export default userReducer;
