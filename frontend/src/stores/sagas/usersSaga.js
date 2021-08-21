import { call, put, takeEvery } from "redux-saga/effects"
import axios from 'axios';

import { URL, CHECK_JWT } from '../../mainConstants';
import {
    SING_UP,
    SING_IN,
    SING_OUT,
} from '../constants/users';
import {
    signInFail,
    signOutFail,
    signInSuccses,
    signOutSuccses,
} from "../actions/users"
import { setPersonalProducts } from "../actions/products";

import { setJWT } from "../../helpers/jwt";

const getErrorInfo = (error) => {
    const {
        response: {
            data: { msg },
            status,
        }
    } = error;
    return { msg, status };
};

const HANDLER = {
    *[CHECK_JWT](payload) {
        try {
            const { data } = yield call(axios, `${URL}/users/check/${payload}`);

            // make function normolize ingredients 
            //  const updatePayload = payload.map(item => ({...item, ingredients: JSON.parse(payload.ingredients)}));
            // console.log('####### ACTION: SET ', updatePayload, '#######')
            
            yield put(signInSuccses(data))
            yield put(setPersonalProducts(data.products))

        }
        catch (error) {
            const {
                response: {
                    data: { msg },
                    status,
                }
            } = error;
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
            yield put(signInSuccses(data))
            setJWT(data.jwt);
        }
        catch (error) {
            const {
                response: {
                    data: { msg },
                    status,
                }
            } = error;
            yield put(signInFail({ status, msg }))
        }
    },

    *[SING_IN](payload) {
        try {
            const { data } = yield call(axios, `${URL}/users/signin`, {
                method: "POST",
                data: payload
            })
            yield put(signInSuccses(data))
            // personalProduct from user.products
            yield put(setPersonalProducts(data.products))
            setJWT(data.jwt);
        }
        catch (error) {
            const {
                response: {
                    data: { msg },
                    status,
                }
            } = error;
            yield put(signInFail({ status, msg }))
        }
    },

    *[SING_OUT](payload) {
        try {
            const response = yield call(axios, `${URL}/users/signout/${payload}`);
            yield put(signOutSuccses());
            // delete products from personal
            yield put(setPersonalProducts([]));
            setJWT('');
        }
        catch (error) {
            const { msg, status } = getErrorInfo(error);
            yield put(signOutFail({ status, msg }))
        }
    },

};

function* sagaManage({ type, payload }) {
    const handler = HANDLER[type];
    if (handler) yield handler(payload);
};

function* usersSagaWatcher() {
    yield takeEvery('*', sagaManage)
}

export default usersSagaWatcher;