import {
    SING_UP,
    SING_IN,
    SING_OUT,
} from "../constants/users";


export const signUp = (payload) => ({
    type: SING_UP,
    payload,
});

export const signIn = (payload) => ({
    type: SING_IN,
    payload,
});

export const signOut = (payload) => ({
    type: SING_OUT,
    payload,
})
