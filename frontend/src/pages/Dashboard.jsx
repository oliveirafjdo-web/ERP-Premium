import React, { useEffect, useState } from 'react';
import { fetchJson } from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchJson('/api/dashboard');
        setStats(data);
      } catch (err) {
        console.error('Erro ao carregar dashboard:', err);
        setError('Erro ao carregar informações do dashboard.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return (
      <div className="box">
        <h2>Dashboard</h2>
        <p style={{ color: '#f87171' }}>{error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="box">
        <h2>Dashboard</h2>
        <p>Nenhum dado disponível.</p>
      </div>
    );
  }

  // aqui use os campos com fallback pra não quebrar se algo vier undefined
  const {
    total_revenue = 0,
    total_profit = 0,
    stock_cost = 0,
    stock_units = 0,
  } = stats;

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="grid">
        <div className="card">
          <h3>Faturamento total</h3>
          <p>R$ {Number(total_revenue).toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Lucro total</h3>
          <p>R$ {Number(total_profit).toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Custo do estoque</h3>
          <p>R$ {Number(stock_cost).toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Unidades em estoque</h3>
          <p>{stock_units}</p>
        </div>
      </div>
    </div>
  );
}
