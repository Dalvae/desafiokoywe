"use client";

import { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import { quotesService } from '@/services/quotes.service';

export default function Home() {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");

  const handleCreateQuote = async () => {
    try {
      const quote = await quotesService.createQuote(amount, fromCurrency, toCurrency);
      alert(`Quote created with id: ${quote.id} and converted amount: ${quote.convertedAmount}`);
    } catch (error: any) {
      console.error("Error creating quote", error);
      alert("Error creating quote: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {user ? (
        <div>
          <h1 className="text-2xl font-bold">Pantalla de Cotización</h1>
          <div>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <input
              type="text"
              placeholder="From Currency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            />
            <input
              type="text"
              placeholder="To Currency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            />
            <button onClick={handleCreateQuote}>Create Quote</button>
          </div>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
