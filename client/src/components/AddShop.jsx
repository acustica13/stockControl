import React, {useEffect, useState} from 'react';
import { fetchBase } from '../utils/Const';
import { withRouter, useParams } from 'react-router-dom';
import {Auth} from '../utils/Auth';

const AddShop = (props) => {
    const auth = Auth();
    const [shop, setShop] = useState({
        name: '',
        location: '',
        phone: '',
        email: '',
        postcode: '',
    })

    const {id} = useParams();
    
    const setShopValue = (e) => {
        setShop({ ...shop, [e.target.name]: e.target.value});
    }


    const addShop = async (e) => {
        e.preventDefault();

        await fetch(`${fetchBase}/tienda/nuevo`, {
            method: 'POST',
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
        <main className="add">
            <h1 className="main-title">Añadir Tienda</h1>
            <div className='addPage'>
                <form onSubmit={addShop} className="form-add">
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
                    <button className="add" type="submit">Añadir</button>
                 </form>
            </div>
        </main>
    );
}

export default withRouter(AddShop);