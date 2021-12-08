import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SideBarData = [
    {
        title: 'Inicio',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
      },
      {
        title: 'Tiendas',
        path: '/tiendas/0',
        icon: <FaIcons.FaWarehouse />,
        cName: 'nav-text'
      },
      {
        title: 'Productos',
        path: '/productos/0',
        icon: <FaIcons.FaShoppingCart />,
        cName: 'nav-text'
      },
      {
        title: 'Proveedores',
        path: '/proveedores/0',
        icon: <FaIcons.FaTruck />,
        cName: 'nav-text'
      },
      {
        title: 'Usuarios',
        path: '/usuarios',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
      }
]