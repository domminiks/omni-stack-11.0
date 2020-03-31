import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import logoImg from "../../assets/logo.svg"

import './styles.css';

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }
        try {
            await api.post('incidents', data, {
                headers : {
                    Authorization : ongId
                }
            });
            history.push('/profile');
        } catch(err) {
            alert('Error registering a new incident. Try again.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero!" />
                    <h1>Register a new incident</h1>
                    <p>Describe the incident in detail and find a hero to fight it.</p>

                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Incident title"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                    <textarea 
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Amount"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}