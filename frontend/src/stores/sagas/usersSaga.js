import { call, put, takeEvery } from "redux-saga/effects"
import axios from 'axios';

import { URL, CHECK_JWT } from '../../mainConstants';
import {
    SING_UP,
    SING_IN,
    SING_OUT,
    ADD_INGREDIENT,
    EDIT_PERSONAL_INGREDIENT,
} from '../constants/users';
import {
    signInFail,
    signOutFail,
    signInSuccess,
    signOutSuccess,
    addIngredientFail,
    addIngredientSuccess,
    editPersonalIngredientFail,
    editPersonalIngredientSuccess,
} from "../actions/users"
import {
    getUsersProducts,
    setPersonalProducts,
} from "../actions/products";

import { setJWT } from "../../helpers/jwt";
import { makeAxiosWithJWTHeader } from '../../helpers/axiosHeader';
import { getErrorInfo } from '../../helpers/errorInfo';



const HANDLER = {
    *[CHECK_JWT](payload) {
        try {
            const { data } = yield makeAxiosWithJWTHeader('users/check')
            yield put(signInSuccess(data))
            yield put(getUsersProducts(data.id))
        }
        catch (error) {
            const { msg, status } = getErrorInfo(error);
            yield put(signInFail({ status, msg }))
            setJWT('')
        }
    },
    *[SING_UP](payload) {
        try {
            const { data } = yield call(axios, `${URL}/users/signup`, {
                method: "POST",
                data: payload
            })
            yield put(signInSuccess(data))
            setJWT(data.jwt);
        }
        catch (error) {
            const { msg, status } = getErrorInfo(error);
            yield put(signInFail({ status, msg }))
        }
    },

    *[SING_IN](payload) {
        try {
            const { data } = yield call(axios, `${URL}/users/signin`, {
                method: "POST",
                data: payload
            })
            yield put(signInSuccess(data))
            yield put(getUsersProducts(data.id))

            setJWT(data.jwt);
        }
        catch (error) {
            const { msg, status } = getErrorInfo(error);
            yield put(signInFail({ status, msg }))
        }
    },

    *[SING_OUT](payload) {
        try {
            yield call(axios, `${URL}/users/signout/${payload}`);
            yield put(signOutSuccess());
            yield put(setPersonalProducts([]));
            setJWT('');
        }
        catch (error) {
            const { msg, status } = getErrorInfo(error);
            yield put(signOutFail({ status, msg }))
        }
    },

    *[ADD_INGREDIENT](payload) {
        try {
            const { data: allUsersIngredients } = yield makeAxiosWithJWTHeader(
                'users/add-ingredient',
                'PATCH',
                payload,
            );
            yield put(addIngredientSuccess(allUsersIngredients))
        }
        catch (error) {
            const { msg, status } = getErrorInfo(error);
            yield put(addIngredientFail({ msg, status }));
        }
    },
    *[EDIT_PERSONAL_INGREDIENT](payload) {
        try {
            const { data } = yield makeAxiosWithJWTHeader(
                'users/edit-ingredient',
                'PATCH',
                payload,
            );
            yield put(editPersonalIngredientSuccess(data))
        }
        catch (error) {
            const { msg, status } = getErrorInfo(error);
            yield put(editPersonalIngredientFail({ msg, status }))
        }
    }

};

function* sagaManage({ type, payload }) {
    const handler = HANDLER[type];
    if (handler) yield handler(payload);
};

function* usersSagaWatcher() {
    yield takeEvery('*', sagaManage)
}

export default usersSagaWatcher;