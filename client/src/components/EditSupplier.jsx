import React, {useEffect, useState} from 'react';
import { fetchBase } from '../utils/Const';
import { withRouter, useParams } from 'react-router-dom';
import {Auth} from '../utils/Auth';

const EditSupplier = (props) => {
    const auth = Auth();
    const [supplier, setSupplier] = useState({
        name: '',
        location: '',
        phone: '',
        email: '',
        postcode: '',
    })

    const {id} = useParams();

    useEffect(() => {
        getSupplierData(auth.authToken, id)
    }, [])

    const setSupplierValue = (e) => {
        setSupplier({ ...supplier, [e.target.name]: e.target.value});
    }

    const setCheckValue = (e) => {
        setSupplier({ ...supplier, [e.target.name]: e.target.checked});
    }

    const getSupplierData = async (token, id) => {
        let supplier = {};

        await fetch(`${fetchBase}/proveedor/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            mode: "cors"
        })
        .then(res => res.json())
        .then(data => supplier = data);
        setSupplier(supplier);
    }

    const updateSupplier = async (e) => {
        e.preventDefault();

        await fetch(`${fetchBase}/proveedor/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.authToken}`
            },
            mode: "cors",
            body: JSON.stringify(supplier)
        })
        props.history.push('/proveedores/0');
    }

    return (
        <main className="edit">
            <h1 className="main-title">Actualizar proveedor</h1>
            <div className='editPage'>
                <form onSubmit={updateSupplier} className="form-update">
                    <label for="name">Nombre</label>
                    <input name="name" id="name" className="data" defaultValue={supplier["name"]} onChange={setSupplierValue} />
                    <label for="location">Localización</label>
                    <input name="location" id="location" className="data" defaultValue={supplier["location"]} onChange={setSupplierValue} />
                    <label for="phone">Teléfono</label>
                    <input name="phone" id="phone" type="phone" className="data" defaultValue={supplier["phone"]} onChange={setSupplierValue} />
                    <label name="email">Email</label>
                    <input name="email" id="email" type="email" className="data" defaultValue={supplier["email"]} onChange={setSupplierValue} />
                    <label name="postcode">Código Postal</label>
                    <input name="postcode" id="postcode" className="data" type="data" pattern="[0-9]{5}" defaultValue={supplier["postcode"]} onChange={setSupplierValue} />
                    <button className="edit" type="submit">Actualizar</button>
                 </form>
            </div>
        </main>
    );
}

export default withRouter(EditSupplier);