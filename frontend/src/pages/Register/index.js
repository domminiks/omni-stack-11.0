import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import logoImg from "../../assets/logo.svg"

import './styles.css';

export default function Register() {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[whatsapp, setWhatsapp] = useState('');
    const[city, setCity] = useState('');
    const[uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        //The page will not reload
        e.preventDefault();

        const data = {
            name,
            whatsapp, 
            email, 
            city,
            uf
        };

        try {
            const response = await api.post('ongs', data);
            alert(`Your ID: ${response.data.id}`);
            history.push('/');
        }  catch(err) {
            alert(err);
            alert("Subscription error. Try again.");
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero!" />
                    <h1>Subscription</h1>
                    <p>Finish your subscription, access the platform and let people help with your incidents.</p>
                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        I don't have an ID  
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="NGO name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-Mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}    
                    />
                    <div className="input-group">
                        <input 
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input 
                            placeholder="State" 
                            style={{width:90}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}