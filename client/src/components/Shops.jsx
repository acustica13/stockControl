import React,  { useEffect, useState } from 'react';
import { fetchBase } from '../utils/Const';
import { withRouter, useParams, Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import {Auth} from '../utils/Auth';

const Shops = (props) => {

    const auth = Auth();
    const [shops, setShops] = useState(null);
    // Paginación
    const [page, setPage] = useState(0);
    const {pagination} = useParams();

    useEffect(() => {
        const changePage = () => {
            if (pagination === undefined
                || isNaN(parseInt(pagination))
                || pagination < 0) {
                    props.history.push("/tiendas/0");
                    showShops(auth.authToken, 0);
                    return;
            }
            setPage(parseInt(pagination));
            showShops(auth.authToken, pagination);
        }

        changePage();
    }, [])

    // TODO: hacer funcion para cambiar el valor de page y hacer navegacion
    const goToPage = (nextOrPrev) => {
        const nextPage = page + nextOrPrev;
        setPage(nextPage);
        if (nextPage === undefined
            || isNaN(parseInt(nextPage))
            || nextPage < 0) {
                props.history.push("/tiendas/0");
                showShops(auth.authToken, 0);
                return;
        }
        props.history.push(`/tiendas/${nextPage}`);
        showShops(auth.authToken, nextPage);
    }

    const showShops = async (token, page=0) => {
        const shopList = [];

        await fetch(`${fetchBase}/tiendas?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            mode: "cors"
        })
        .then(res => res.json())
        .then(data => shopList.push(...data));

        // Si no hay elementos en la lista, me lleva a la ultima pagina donde los habia
        if (shopList.length > 0) {
            setShops(shopList);
        } else {
            goToPage(-1)
        }
    }

    const deleteShop = async (id, token) => {
        let response;

        await fetch(`${fetchBase}/tienda/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            mode: "cors"
        })
        .then(res => response = res.status);

        console.log(response);
        if (response === 200) {
            showShops(token)
        }
    }

    return (
        <main>
            <h1 className="main-title">Tiendas</h1>
            <div className='shops'>
                {/* <!-- Page wrapper/Container Section --> */}
                <div className="container">
                    {/* <!-- Responsive Table Section --> */}
                    <table className="responsive-table">
                        {/* <!-- Responsive Table Header Section --> */}
                        <thead className="table-head">
                            <tr className="table-row">
                                <th className="table-head-title">Id</th>
                                <th className="table-head-title">Nombre</th>
                                <th className="table-head-title">Localización</th>
                                <th className="table-head-title">Teléfono</th>
                                <th className="table-head-title">Email</th>
                                <th className="table-head-title">Código Postal</th>
                                <th className="table-head-title">Editar</th>
                                <th className="table-head-title">Borrar</th>
                            </tr>
                        </thead>
                        {/* <!-- Responsive Table Body Section --> */}
                        <tbody className="table-body">
                            {
                                shops && shops.map(shop =>
                                <tr className="table-row" key={shop.id}>
                                    <td className="table-body-text">{shop.id}</td>
                                    <td className="table-body-text">{shop.name}</td>
                                    <td className="table-body-text">{shop.location}</td>
                                    <td className="table-body-text">{shop.phone}</td>
                                    <td className="table-body-text">{shop.email}</td>
                                    <td className="table-body-text">{shop.postcode}</td>
                                    <td className="table-body-text table-body-btn"><Link to={`/tienda/${shop.id}`} className="icon"><FaIcons.FaEdit /></Link></td>
                                    <td className="table-body-text table-body-btn"><a onClick={() => deleteShop(shop.id, auth.authToken)}><FaIcons.FaTrash /></a></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="btns">
                        <div className="btn-add">
                            <button><Link to={`/tienda/nuevo`}>Añadir tienda</Link></button>
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

export default withRouter(Shops);
