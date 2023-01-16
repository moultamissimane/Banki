import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetchHelper";
import { types } from "../types/types";

export const startRegister = (
  firstname,
  lastname,
  email,
  nationality,
  phone,
  password,
  birthday,
  amount
) => {
  return async (dispatch) => {
    const role = "USER_ROLE";

    const data = {
      firstname,
      lastname,
      email,
      nationality,
      phone,
      password,
      birthday,
      amount,
      role,
    };

    const resp = await fetchSinToken("users/", data, "POST");
    const body = await resp.json();

    if (!body) {
      if (body.errors) {
        Swal.fire("Error", "Please complete all the fields", "error");
      }
    }

    const user = body;

    dispatch(
      login({
        email: user.email,
        user: `${user.firstname} ${user.lastname}`,
        balance: user.amount,
        id: user.id,
      })
    );
  };
};

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken("login/", { email, password }, "POST");

    console.log(resp)
    const body = await resp.json();

    const { user } = body;

    const token = body.token;

    localStorage.setItem("token", token);

    console.log(body);

    dispatch(
      login({
        email: user.email,
        user: user.user,
        balance: user.balance,
        id: user.id,
        phone: user.phone,
        role: user.role,
        birthday: user.birthday,
        nationality: user.nationality,
        status: user.status
      })
    );

    // dispatch(login(user))
  };
};

export const startCheckingAuthToken = (id) => {
  return async (dispatch) => {
    const resp = await fetchConToken("session/", id, "POST");

    const body = await resp.json();

    const { user } = body;

    localStorage.setItem("token", body.token);

    dispatch(
      login({
        email: user.email,
        user: `${user.firstname} ${user.lastname}`,
        balance: user.amount,
        id: user.id,
        phone: user.phone,
        role: user.role,
        birthday: user.birthday,
        nationality: user.nationality,
        status: user.status
      })
    );

    // dispatch(login(user))
  };
};

const login = (user) => ({
  type: types.login,
  payload: {
    email: user.email,
    user: user.user,
    balance: user.balance,
    id: user.id,
    phone: user.phone,
    role: user.role,
    birthday: user.birthday,
    nationality: user.nationality,
    status: user.status
  },
});

export const finishCheckingToken = () => ({ type: types.finishCheckingToken });
export const startLogout = () => ({ type: types.logout });
