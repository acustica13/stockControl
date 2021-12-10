import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Auth} from '../utils/Auth';

const Register = (props) => {
    const auth = Auth();

    const [error, setError] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async (e) => {
        e.preventDefault();

        setError("");

        const token = await auth.register({"email": email, "password": password})

        if (token != null) {
            props.history.push("/productos/0")
        }
    }

    return (
        <main>
            <section id="register">
                <h1>Crear una cuenta</h1>
                <div className="register">
                    <form className="" onSubmit={register}>
                        {error.trim() && <p className="error">{error}</p>}
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} value={email}/>

                        <label htmlFor="pass">Contraseña</label>
                        <input type="password" id="pass" name="pass" min="6" max="20" required onChange={(e) => setPassword(e.target.value)} value={password}/>

                        <div className="submit">
                            <button>Registrar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default withRouter(Register);