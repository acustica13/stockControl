import React,  { useEffect, useState } from 'react';
import { fetchBase } from '../utils/Const';
import { withRouter, useParams, Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import {Auth} from '../utils/Auth';

const Suppliers = (props) => {

    const auth = Auth();
    const [suppliers, setSuppliers] = useState(null);
    // Paginación
    const [page, setPage] = useState(0);
    const {pagination} = useParams();

    useEffect(() => {
        // TODO: reutilizar funcion :D
        const changePage = () => {
            if (pagination === undefined
                || isNaN(parseInt(pagination))
                || pagination < 0) {
                    props.history.push("/proveedores/0");
                    showSuppliers(auth.authToken, 0);
                    return;
            }
            setPage(parseInt(pagination));
            showSuppliers(auth.authToken, pagination);
        }

        changePage();
    }, [])

    const goToPage = (nextOrPrev) => {
        const nextPage = page + nextOrPrev;
        setPage(nextPage);
        if (nextPage === undefined
            || isNaN(parseInt(nextPage))
            || nextPage < 0) {
                props.history.push("/proveedores/0");
                showSuppliers(auth.authToken, 0);
                return;
        }
        props.history.push(`/proveedores/${nextPage}`);
        showSuppliers(auth.authToken, nextPage);
    }

    const showSuppliers = async (token, page=0) => {
        const supplierList = [];

        await fetch(`${fetchBase}/proveedores?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            mode: "cors"
        })
        .then(res => res.json())
        .then(data => supplierList.push(...data));

        if (supplierList.length > 0) {
            setSuppliers(supplierList);
        } else {
            goToPage(-1)
        }
    }

    const deleteSupplier = async (id, token) => {
        let response;

        await fetch(`${fetchBase}/proveedor/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            mode: "cors"
        })
        .then(res => response = res.status);

        console.log(response);
        if (response === 200) {
            showSuppliers(token)
        }
    }

    return (
        <main>
            <h1 className="main-title">Proveedores</h1>
            <div className='suppliers'>
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
                                suppliers && suppliers.map(supplier =>
                                <tr className="table-row" key={supplier.id}>
                                    <td className="table-body-text">{supplier.id}</td>
                                    <td className="table-body-text">{supplier.name}</td>
                                    <td className="table-body-text">{supplier.location}</td>
                                    <td className="table-body-text">{supplier.phone}</td>
                                    <td className="table-body-text">{supplier.email}</td>
                                    <td className="table-body-text">{supplier.postcode}</td>
                                    <td className="table-body-text table-body-btn"><Link to={`/proveedor/${supplier.id}`} className="icon"><FaIcons.FaEdit /></Link></td>
                                    <td className="table-body-text table-body-btn"><a className="icon" onClick={() => deleteSupplier(supplier.id, auth.authToken)}><FaIcons.FaTrash /></a></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="btns">
                        <div className="btn-add">
                            <button><Link to={`/proveedor/nuevo`}>Añadir proveedor</Link></button>
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

export default withRouter(Suppliers);
