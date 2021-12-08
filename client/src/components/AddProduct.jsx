import React, {useEffect, useState} from 'react';
import { fetchBase } from '../utils/Const';
import { withRouter, useParams } from 'react-router-dom';
import {Auth} from '../utils/Auth';

const AddProduct = (props) => {
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
        categories: []
    });

    const [categories, setCategories] = useState(undefined);

    const {id} = useParams();

    useEffect(() => {
        getCategories(auth.authToken);
    }, []);

    const setProductValue = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value});
    }

    const setCheckValue = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.checked});
    }

    const getCategories = async () => {
        await fetch(`${fetchBase}/categorias`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.authToken}`
            },
            mode: "cors",
        })
        .then(res => res.json())
        .then(data => setCategories(data));
    }

    const setCategory = (e, category) => {
        if (e.target.checked) {
            product.categories.push({
                id: category.id,
                name: category.name
            });

        } else {
            product.categories = product.categories.filter(c => c.id !== category.id)
        }
    }

    const addProduct = async (e) => {
        e.preventDefault();

        await fetch(`${fetchBase}/producto/nuevo`, {
            method: 'POST',
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
        <main className="add">
            <h1 className="main-title">Añadir producto</h1>
            <div className='addPage'>
                <form onSubmit={addProduct} className="form-add">
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
                    <div className="categories">
                        <span>Categorías</span>
                        {categories && categories.map(category =>
                            <div class="checkMarkDiv">
                                <input id={category.name} className="checkMark" type="checkbox" onChange={(event) => setCategory(event, category)} />
                                <label for={category.name}>{category.name}</label>
                            </div>
                        )}
                    </div>
                    <button className="add" type="submit">Añadir</button>
                 </form>
            </div>
        </main>
    );
}

export default withRouter(AddProduct);