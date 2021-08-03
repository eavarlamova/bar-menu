import { call, put, takeEvery } from "redux-saga/effects"

import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
} from '../constants/products';


const HANDLER = {
    *[ADD_PRODUCT](payload) {
        try{
            // const response = yield call(axios, '/product/' , {
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

function* productsSagaWatcher() {
    yield takeEvery('*', sagaManage)
}

export default productsSagaWatcher;