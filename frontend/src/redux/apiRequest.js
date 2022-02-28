import api from '../api';
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from './authSlice';
import { getUserFailed, getUserStart, getUserSuccess } from './userSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());

    try {
        const res = await api.post("/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    }
    catch (err) {
        dispatch(loginFailed());
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());

    try {
        const res = await api.post("/v1/auth/register", user);
        dispatch(registerSuccess());
        navigate("/login");
    }
    catch (err) {
        dispatch(registerFailed());
    }
}

export const getAllUsers = async (accessToken, dispatch) => {
    dispatch(getUserStart());

    try {
        const res = await api.get("/v1/user", {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })

        dispatch(getUserSuccess(res.data));
    }
    catch (err) {
        dispatch(getUserFailed());
    }
}