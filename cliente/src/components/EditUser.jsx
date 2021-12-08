import React, {useEffect, useState} from 'react';
import { fetchBase } from '../utils/Const';
import { withRouter, useParams } from 'react-router-dom';
import {Auth} from '../utils/Auth';

const EditUser = (props) => {
    const auth = Auth();
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    })

    const {id} = useParams();

    useEffect(() => {
        getUserData(auth.authToken, id)
    }, [])

    const setUserValue = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value});
    }

    const setCheckValue = (e) => {
        setUser({ ...user, [e.target.name]: e.target.checked});
    }

    const getUserData = async (token, id) => {
        let user = {};

        await fetch(`${fetchBase}/usuario/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            mode: "cors"
        })
        .then(res => res.json())
        .then(data => user = data);
        setUser(user);
    }

    const updateUser = async (e) => {
        e.preventDefault();

        await fetch(`${fetchBase}/usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.authToken}`
            },
            mode: "cors",
            body: JSON.stringify(user)
        })
        props.history.push('/usuarios/0');
    }

    return (
        <main className="edit">
            <h1 className="main-title">Actualizar Usuario</h1>
            <div className='editPage'>
                <form onSubmit={updateUser} className="form-update">
                    <label for="name">Nombre</label>
                    <input name="name" id="name" className="data" defaultValue={user["name"]} onChange={setUserValue} />
                    <label for="surname">Apellidos</label>
                    <input name="surname" id="surname" className="data" defaultValue={user["surname"]} onChange={setUserValue} />
                    <label for="email">Email</label>
                    <input name="email" id="email" type="email" className="data" defaultValue={user["email"]} onChange={setUserValue} />
                    {/* <label name="email">Contraseña</label>
                    <input name="password" id="password" type="password" className="data" defaultValue={user["password"]} onChange={setUserValue} /> */}
                    <button className="edit" type="submit">Actualizar</button>
                 </form>
            </div>
        </main>
    );
}

export default withRouter(EditUser);