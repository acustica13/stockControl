import React, {useEffect, useState} from 'react';
import { fetchBase } from '../utils/Const';
import { withRouter, useParams } from 'react-router-dom';
import {Auth} from '../utils/Auth';

const EditProduct = (props) => {
    const auth = Auth();
    const [product, setProduct] = useState({
        brand: '',
        name: '',
        color: '',
        stock: '',
        datePurchase: '',
        pricePurchase: '',
        priceSale: '',
        discount: '',
        discontinued: '',
    })

    const {id} = useParams();

    useEffect(() => {
        getProductData(auth.authToken, id)
    }, [])

    const setProductValue = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value});
    }

    const setCheckValue = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.checked});
    }

    const getProductData = async (token, id) => {
        let product = {};

        await fetch(`${fetchBase}/producto/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            mode: "cors"
        })
        .then(res => res.json())
        .then(data => product = data);
        setProduct(product);
    }

    const updateProduct = async (e) => {
        e.preventDefault();

        await fetch(`${fetchBase}/producto/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.authToken}`
            },
            mode: "cors",
            body: JSON.stringify(product)
        })
        props.history.push('/productos/0');
    }

    return (
        <main className="edit">
            <h1 className="main-title">Actualizar producto</h1>
            <div className='editPage'>
                <form onSubmit={updateProduct} className="form-update">
                    <label for="brand">Marca</label>
                    <input name="brand" id="brand" className="data" defaultValue={product["brand"]} onChange={setProductValue} />
                    <label for="name">Nombre</label>
                    <input name="name" id="name" className="data" defaultValue={product["name"]} onChange={setProductValue} />
                    <label for="color">Color</label>
                    <input name="color" id="color" className="data" defaultValue={product["color"]} onChange={setProductValue} />
                    <label for="stock">Stock</label>
                    <input name="stock" id="stock" type="number" className="data" defaultValue={product["stock"]} onChange={setProductValue} />
                    <label name="datePurchase">Fecha de compra</label>
                    <input name="datePurchase" id="datePurchase" type="date" className="data" defaultValue={product["datePurchase"]} onChange={setProductValue} />
                    <label name="pricePurchase">Precio de compra</label>
                    <input name="pricePurchase" id="pricePurchase" type="number" className="data" defaultValue={product["pricePurchase"]} onChange={setProductValue} />
                    <label for="priceSale">Precio de venta</label>
                    <input name="priceSale" id="priceSale" type="number" className="data" defaultValue={product["priceSale"]} onChange={setProductValue} />
                    <label for="discount">Descuento</label>
                    <input name="discount" id="discount" type="number" className="data" defaultValue={product["discount"]} onChange={setProductValue} />
                    <div class="checkMarkDiv">
                        <input name="discontinued" id="discontinued" className="checkMark" type="checkbox" checked={product["discontinued"]} onChange={setCheckValue} />
                        <label for="discontinued">Descatalogado</label>
                    </div>
                    <button className="edit" type="submit">Actualizar</button>
                 </form>
            </div>
        </main>
    );
}

export default withRouter(EditProduct);