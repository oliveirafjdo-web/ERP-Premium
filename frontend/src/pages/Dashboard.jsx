import React, { useEffect, useState } from 'react';
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
    return <div style={{ padding: '16px' }}>Carregando...</div>;
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

  const {
    total_revenue = 0,
    total_profit = 0,
    stock_cost = 0,
    stock_units = 0,
    daily_revenue = 0,
    daily_profit = 0,
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
        <div className="card">
          <h3>Faturamento do dia</h3>
          <p>R$ {Number(daily_revenue).toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Lucro do dia</h3>
          <p>R$ {Number(daily_profit).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
