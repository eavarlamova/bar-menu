import { call, put, takeEvery } from "redux-saga/effects"

import {
    SING_UP,
    SING_IN,
    SING_OUT,
} from '../constants/users';


const HANDLER = {
    *[SING_UP](payload) {
        try{
            // const response = yield call(axios, '/users/' , {
            //     method: "GET",
            //     data: payload
            // })
            // // if we have succses response
            // // we'll must make new action
            // yield put(newAction(response.data)) 
        }
        catch(error){}
    },

};

function* sagaManage({type, payload}) {
    const handler = HANDLER[type];
    if(handler) yield handler(payload);
};

function* usersSagaWatcher() {
    yield takeEvery('*', sagaManage)
}

export default usersSagaWatcher;