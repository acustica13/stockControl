import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Auth} from '../utils/Auth';

const Login = (props) => {
    const auth = Auth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async (e) => {
        e.preventDefault();

        setError("");

        if (!email.trim()) {
            setError("Email o contraseña incorrecta");
            return;
        }

        if (!password.trim()) {
            setError("Email o contraseña incorrecta");
            return;
        }

        try {
            let token = await auth.login(email, password)

            if (token.toLowerCase() !== email.toLowerCase()) {
                props.history.push("/productos/0");

            } else {
                setError("Email o contraseña incorrecta");
            }

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // Si el token ya existe, nos vamos a productos
        if (auth.authToken !== undefined) {
            props.history.push("/productos/0");
        }
    }, []);

    return (
        <main>
            <section id="login">
                <h1>¡Hola de nuevo!</h1>
                <div className="login">
                    {error.trim() && <p className="error">{error}</p>}
                    <form className="loginForm" onSubmit={login}>
                        <label htmlFor="usuario">Correo electrónico</label>
                        <input type="text" id="usuario" name="" onChange={e => setEmail(e.target.value)}
                            value={email}/>
                        <label htmlFor="pass">Contraseña</label>
                        <input type="password" id="pass" name="" onChange={e => setPassword(e.target.value)}
                            value={password}/>
                        <span>
                            <a href="#">¿No recuerdas tu contraseña?</a>
                        </span>
                        <div className="submit">
                            <button>Acceder</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default withRouter(Login);