import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => {
    return (
        <footer>
            <p><Link to="/">Stock Control</Link></p>
            <p>Realizado por Paula Pavón Montañez</p>
        </footer>
    )
}

export default Footer