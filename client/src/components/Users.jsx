import React,  { useEffect, useState } from 'react';
import { fetchBase } from '../utils/Const';
import { withRouter, useParams, Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import {Auth} from '../utils/Auth';

const Users = (props) => {

    const auth = Auth();
    const [users, setUsers] = useState(null);
    // Paginación
    const [page, setPage] = useState(0);
    const {pagination} = useParams();

    useEffect(() => {
        const changePage = () => {
            if (pagination === undefined
                || isNaN(parseInt(pagination))
                || pagination < 0) {
                    props.history.push("/usuarios/0");
                    showUsers(auth.authToken, 0);
                    return;
            }
            setPage(parseInt(pagination));
            showUsers(auth.authToken, pagination);
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
                props.history.push("/usuarios/0");
                showUsers(auth.authToken, 0);
                return;
        }
        props.history.push(`/usuarios/${nextPage}`);
        showUsers(auth.authToken, nextPage);
    }

    const showUsers = async (token, page=0) => {
        const shopList = [];

        await fetch(`${fetchBase}/usuarios?page=${page}`, {
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
            setUsers(shopList);
        } else {
            goToPage(-1)
        }
    }

    const deleteUser = async (id, token) => {
        let response;

        await fetch(`${fetchBase}/usuario/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            mode: "cors"
        })
        .then(res => response = res.status);

        console.log(response);
        if (response === 200) {
            showUsers(token)
        }
    }

    return (
         <main>
            <h1 className="main-title">Tiendas</h1>
            <div className='users'>
                <div className="container">
                    <table className="responsive-table">
                        <thead className="table-head">
                            <tr className="table-row">
                                <th className="table-head-title">Id</th>
                                <th className="table-head-title">Nombre</th>
                                <th className="table-head-title">Apellidos</th>
                                <th className="table-head-title">Email</th>
                                <th className="table-head-title">Editar</th>
                                <th className="table-head-title">Borrar</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {
                                users && users.map(user =>
                                <tr className="table-row" key={user.id}>
                                    <td className="table-body-text">{user.id}</td>
                                    <td className="table-body-text">{user.name}</td>
                                    <td className="table-body-text">{user.surname}</td>
                                    <td className="table-body-text">{user.email}</td>
                                    <td className="table-body-text table-body-btn"><Link to={`/usuario/${user.id}`} className="icon"><FaIcons.FaEdit /></Link></td>
                                    <td className="table-body-text table-body-btn"><a onClick={() => deleteUser(user.id, auth.authToken)}><FaIcons.FaTrash /></a></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="btn-paginate">
                        <button onClick={() => goToPage(-1)}>Anterior</button>
                        <button onClick={()=> goToPage(1)}>Siguiente</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default withRouter(Users);
