export const addInfo = (info) => {
  return {
    payload: info,
    type: "ADD_USER_INFO",
  };
};
export const changeTheme = (theme) => {
  return {
    payload: theme,
    type: "CHANGE_THEME",
  };
};
