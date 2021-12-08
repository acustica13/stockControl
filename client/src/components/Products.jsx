import React,  { useEffect, useState } from 'react';
import { fetchBase } from '../utils/Const';
import { listToString } from '../utils/StringUtils';
import { withRouter, useParams, Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import {Auth} from '../utils/Auth';

const Products = (props) => {

    const auth = Auth();
    const [products, setProducts] = useState(null);
    const [brands, setBrands] = useState(null);
    // Paginación
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [page, setPage] = useState(0);
    const {pagination} = useParams();

    useEffect(() => {
        // TODO: reutilizar funcion :D
        const changePage = () => {
            if (pagination === undefined
                || isNaN(parseInt(pagination))
                || pagination < 0) {
                    props.history.push("/productos/0");
                    showProducts(auth.authToken, 0, name, brand);
                    return;
            }
            setPage(parseInt(pagination));
            showProducts(auth.authToken, pagination, name, brand);
        }

        changePage();
        getBrands(auth.authToken);
    }, [])

    const goToPage = (nextOrPrev) => {
        const nextPage = page + nextOrPrev;
        if (nextPage === undefined
            || isNaN(parseInt(nextPage))
            || nextPage < 0) {
                props.history.push("/productos/0");
                showProducts(auth.authToken, 0, name, brand);
                return;
        }
        setPage(nextPage);
        props.history.push(`/productos/${nextPage}`);
        showProducts(auth.authToken, nextPage, name, brand);
    }

    const showProducts = async (token, page=0, name="", brand="") => {
        const productList = [];

        await fetch(`${fetchBase}/productos?page=${page}&name=${name}&brand=${brand}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            mode: "cors"
        })
        .then(res => res.json())
        .then(data => productList.push(...data));

        if (productList.length > 0) {
            setProducts(productList);
        } else {
            props.history.push("/productos/0")
        }
    }

    const deleteProduct = async (id, token) => {
        let response;

        await fetch(`${fetchBase}/producto/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            mode: "cors"
        })
        .then(res => response = res.status);

        console.log(response);
        if (response === 200) {
            showProducts(token, page, name, brand)
        }
    }
    const getBrands = async (token) => {

        await fetch(`${fetchBase}/productos/brand`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            mode: "cors"
        })
        .then(res => res.json())
        .then(data => setBrands([...data]));
    }

    const search = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const brands = formData.get("brands");
        setName(name === undefined ? "" : name);
        setBrand(brands === undefined ? "" : brands);
        showProducts(auth.authToken, page, name, brands);
    }

    return (
        <main>
            <div className="title-search">
                <h1 className="main-title title-products">Productos</h1>
                <div className='search'>
                    <form onSubmit={search}>
                        <input className="searchBar" type="text" placeholder="Busca un producto" name="name" />
                        <div className="select">
                            <label forhtml="brands">Marca:</label>
                            <select id="brands" name="brands" className='searchSelect'>
                                <option value="">Todas</option>
                                {
                                    brands && brands.map((brand, i) =>
                                        <option value={brand} key={i}>{brand}</option>
                                    )
                                }
                            </select>
                        </div>
                        <button type="submit"><FaIcons.FaSearch /><span class="search-text-btn">Buscar</span></button>
                    </form>
                </div>
            </div>
            <div className='products'>
                {/* <!-- Page wrapper/Container Section --> */}
                <div className="container container-products">
                    {/* <!-- Responsive Table Section --> */}
                    <table className="responsive-table">
                        {/* <!-- Responsive Table Header Section --> */}
                        <thead className="table-head">
                            <tr className="table-row">
                                <th className="table-head-title">Id</th>
                                <th className="table-head-title">Marca</th>
                                <th className="table-head-title">Nombre</th>
                                <th className="table-head-title">Color</th>
                                <th className="table-head-title">Stock</th>
                                <th className="table-head-title">Fecha de compra</th>
                                <th className="table-head-title">Precio de compra</th>
                                <th className="table-head-title">Precio de venta</th>
                                <th className="table-head-title">Descuento</th>
                                <th className="table-head-title">Descatalogado</th>
                                <th className="table-head-title">Categorías</th>
                                <th className="table-head-title">Lotes</th>
                                <th className="table-head-title">Editar</th>
                                <th className="table-head-title">Borrar</th>
                            </tr>
                        </thead>
                        {/* <!-- Responsive Table Body Section --> */}
                        <tbody className="table-body">
                            {
                                products && products.map(product =>
                                <tr className="table-row" key={product.id}>
                                    <td className="table-body-text">{product.id}</td>
                                    <td className="table-body-text">{product.brand}</td>
                                    <td className="table-body-text">{product.name}</td>
                                    <td className="table-body-text">{product.color}</td>
                                    <td className="table-body-text">{product.stock}</td>
                                    <td className="table-body-text">{product.datePurchase}</td>
                                    <td className="table-body-text">{product.pricePurchase}</td>
                                    <td className="table-body-text">{product.priceSale}</td>
                                    <td className="table-body-text">{product.discount}</td>
                                    <td className="table-body-text">{product.discontinued ? "Sí" : "No"}</td>
                                    <td className="table-body-text">{listToString(product.categories, "name")}</td>
                                    <td className="table-body-text">{listToString(product.batches, "expirationDate")}</td>
                                    <td className="table-body-text table-body-btn"><Link to={`/producto/${product.id}`} className="icon"><FaIcons.FaEdit /></Link></td>
                                    <td className="table-body-text table-body-btn"><a className="icon" onClick={() => deleteProduct(product.id, auth.authToken)}><FaIcons.FaTrash /></a></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="btns">
                        <div className="btn-add">
                            <button><Link to={`/producto/nuevo`}>Añadir producto</Link></button>
                        </div>
                        <div className="btn-paginate">
                            <button onClick={() => goToPage(-1)}>Anterior</button>
                            <button onClick={() => goToPage(1)}>Siguiente</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default withRouter(Products);
