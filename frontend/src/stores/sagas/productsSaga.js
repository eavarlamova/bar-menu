import axios from "axios";
import { useSelector } from "react-redux";
import { call, put, takeEvery } from "redux-saga/effects"

import { URL } from "../../mainConstants";
import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
} from '../constants/products';
import {
    addProductSuccses,
} from '../actions/products';


const HANDLER = {
    *[ADD_PRODUCT](payload) {
        try {
            const { data } = yield call(axios, `${URL}/products/add`, {
                method: "POST",
                data: payload,
            });
            yield put(addProductSuccses(data))

        }
        catch (error) { }
    },

};

function* sagaManage({ type, payload }) {
    const handler = HANDLER[type];
    if (handler) yield handler(payload);
};

function* productsSagaWatcher() {
    yield takeEvery('*', sagaManage)
}

export default productsSagaWatcher;