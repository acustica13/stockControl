import React, {useEffect, useState} from 'react';
import { fetchBase } from '../utils/Const';
import { withRouter, useParams } from 'react-router-dom';
import {Auth} from '../utils/Auth';

const EditShop = (props) => {
    const auth = Auth();
    const [shop, setShop] = useState({
        name: '',
        location: '',
        phone: '',
        email: '',
        postcode: '',
    })

    const {id} = useParams();

    useEffect(() => {
        getShopData(auth.authToken, id)
    }, [])

    const setShopValue = (e) => {
        setShop({ ...shop, [e.target.name]: e.target.value});
    }

    const setCheckValue = (e) => {
        setShop({ ...shop, [e.target.name]: e.target.checked});
    }

    const getShopData = async (token, id) => {
        let shop = {};

        await fetch(`${fetchBase}/tienda/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            mode: "cors"
        })
        .then(res => res.json())
        .then(data => shop = data);
        setShop(shop);
    }

    const updateShop = async (e) => {
        e.preventDefault();

        await fetch(`${fetchBase}/tienda/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.authToken}`
            },
            mode: "cors",
            body: JSON.stringify(shop)
        })
        props.history.push('/tiendas/0');
    }

    return (
        <main className="edit">
            <h1 className="main-title">Actualizar Tienda</h1>
            <div className='editPage'>
                <form onSubmit={updateShop} className="form-update">
                    <label for="name">Nombre</label>
                    <input name="name" id="name" className="data" defaultValue={shop["name"]} onChange={setShopValue} />
                    <label for="location">Localización</label>
                    <input name="location" id="location" className="data" defaultValue={shop["location"]} onChange={setShopValue} />
                    <label for="phone">Teléfono</label>
                    <input name="phone" id="phone" type="phone" className="data" defaultValue={shop["phone"]} onChange={setShopValue} />
                    <label name="email">Email</label>
                    <input name="email" id="email" type="email" className="data" defaultValue={shop["email"]} onChange={setShopValue} />
                    <label name="postcode">Código Postal</label>
                    <input name="postcode" id="postcode" type="text" pattern="[0-9]{5}" className="data" defaultValue={shop["postcode"]} onChange={setShopValue} />
                    <button className="edit" type="submit">Actualizar</button>
                 </form>
            </div>
        </main>
    );
}

export default withRouter(EditShop);