export const getIsUserLogin = ({ auth }) => auth.userAuthorized;
export const getUserData = ({ auth }) => {
  return {
    login: auth.login,
    email: auth.email,
    uid: auth.userID,
  };
};

export const isLoading = ({ auth }) => {
  return auth.loading;
};