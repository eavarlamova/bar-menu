import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

import Navbar from "../../components/Navbar";

import './index.scss';


const User = (props) => {
    const { match: { params: { id: idFromURL } } } = props;
    const { isAuth, user: { id: idOfCurrentUser } } = useSelector(state => state.users);
    const [needRedirect, setNeedRedirect] = useState(false);

    useEffect(() => {
        if (Number(idOfCurrentUser) === Number(idFromURL) && isAuth) {
            setNeedRedirect(true);
        }
    }, [idFromURL, idOfCurrentUser])



    if (needRedirect) return <Redirect to='/user' />

    return (
        <>
            <Navbar />
            <div className="user">
                User`s page

            </div>
        </>
    )
};

export default memo(User);