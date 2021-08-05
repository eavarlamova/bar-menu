import { call, put, takeEvery } from "redux-saga/effects"
import axios from 'axios';

import { URL } from '../../mainConstants';
import {
    SING_UP,
    SING_IN,
    SING_OUT,
} from '../constants/users';
import {
    signUpFail,
    signUpSuccses,
} from "../actions/users"
import { setJWT } from "../../helpers/jwt";


const HANDLER = {
    *[SING_UP](payload) {
        try {
            const { data } = yield call(axios, `${URL}/users/signup`, {
                method: "POST",
                data: payload
            })
            yield put(signUpSuccses(data))
            setJWT(data.jwt);
        }
        catch (error) {
            const {
                response: {
                    data: { msg },
                    status,
                }
            } = error;
            yield put(signUpFail({ status, msg }))
        }
    },

    *[SING_IN](payload) {
        try {
            const { data } = yield call(axios, `${URL}/users/signin`, {
                method: "POST",
                data: payload
            })
            console.log('data', data)
            // yield put(signUpSuccses(data))
            // setJWT(data.jwt);
        }
        catch (error) {
            // const {
            //     response: {
            //         data: { msg },
            //         status,
            //     }
            // } = error;
            // yield put(signUpFail({ status, msg }))
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