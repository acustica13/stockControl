import React, {useEffect, useState} from 'react';
import { fetchBase } from '../utils/Const';
import { withRouter, useParams } from 'react-router-dom';
import {Auth} from '../utils/Auth';

const AddSupplier = (props) => {
    const auth = Auth();
    const [supplier, setSupplier] = useState({
        name: '',
        location: '',
        phone: '',
        email: '',
        postcode: '',
    })

    const {id} = useParams();

    const setSupplierValue = (e) => {
        setSupplier({ ...supplier, [e.target.name]: e.target.value});
    }


    const updateSupplier = async (e) => {
        e.preventDefault();

        await fetch(`${fetchBase}/proveedor/nuevo`, {
            method: 'POST',
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
        <main className="add">
            <h1 className="main-title">Añadir proveedor</h1>
            <div className='addPage'>
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
                    <button className="add" type="submit">Añadir</button>
                 </form>
            </div>
        </main>
    );
}

export default withRouter(AddSupplier);