const DEFAULT_STATE = {
  theme: "light",
};
const themeReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  console.log("ayaaaa");
  switch (type) {
    case "CHANGE_THEME":
      if (state.theme == "light") {
        if (payload == "dark") return { theme: "dark" };
      }
      if (state.theme == "dark") {
        if (payload == "light") return { theme: "light" };
      }
    default:
      return state;
  }
};
export default themeReducer;
