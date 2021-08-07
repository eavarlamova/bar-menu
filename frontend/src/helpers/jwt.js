import { JWT_TOKEN } from '../mainConstants';

export const getJWT = () => (localStorage.getItem(JWT_TOKEN));
export const setJWT = (jwt) => { localStorage.setItem(JWT_TOKEN, jwt) };