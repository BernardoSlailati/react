import api from "./api";

export const ACTION_TYPES = {
  REGISTER: "REGISTER",
  LOGIN: "LOGIN",
};

export const register = (data, onSuccess) => (dispatch) => {
  api
    .login()
    .register(data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.REGISTER,
        payload: { ...response.data },
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const login = (data, onSuccess) => (dispatch) => {
  api
    .login()
    .login(data)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.LOGIN,
        payload: { ...response.data },
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
