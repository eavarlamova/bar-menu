import axios from "axios";
import { call } from "redux-saga/effects";

import { getJWT } from "./jwt";
import { URL } from "../mainConstants";

export const makeAxiosWithJWTHeader = (
  urlRoute = "/",
  method = "GET",
  data,
  contentType = "application/json"
) => {
  const jwt = getJWT();
  if (jwt) {
    return call(axios, `${URL}/${urlRoute}`, {
      method,
      data,
      headers: {
        Authorization: jwt,
        "Content-Type": contentType,
      },
    });
  }
};
