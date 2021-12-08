import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom';
import {Auth} from '../utils/Auth';

const Logout = (props) => {

    const auth = Auth();

    useEffect(() => {
        const logout = () => {
            auth.logout();
            props.history.push("/")
        }

        logout();
    }, [])

    return (
        <></>
    )
}

export default withRouter(Logout)