import {useCookies} from 'react-cookie';
import {fetchBase, cookieExpire} from '../utils/Const'


const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['authtoken']);

    const authToken = cookies.token;

    const login = async (email, password) => {
        let token;

        await fetch(`${fetchBase}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            body: JSON.stringify({"email": email, "password": password}),
        }).then(response => response.text())
            .then(data => token = data);
        if (token.toLowerCase() !== email.toLowerCase()) {
            setCookie("token", token, { expires: cookieExpire(), path: "/" });
        }

        return token;
    }

    const register = async (registerUser) => {
        let token;

        await fetch(`${fetchBase}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            body: JSON.stringify(registerUser),
        }).then(response => response.text())
            .then(data => token = data);

        return token;
    }

    const logout = () => {
        removeCookie("token", {path: "/"});
    }

    return { authToken, login, register, logout };
}

export {Auth};