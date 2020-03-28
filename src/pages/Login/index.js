import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post('/sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/perfil');
    } catch (error) {
      alert('Falha no login. Tente novamente');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>

          <input
            placeholder="seu ID"
            value={id}
            onChange={event => setId(event.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/cadastro">
            <FiLogIn size={16} color="#e02041" />
            Não tem cadastro?
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}