import { URL_FRONT } from '../mainConstants'

export const redirectWithAuth = (isAuth) => {
    // work but site reload and redux-store will null 
    // and redirect from App.js work
    // we need check token every reload page
    if (isAuth) window.location = `${URL_FRONT}/user`
};