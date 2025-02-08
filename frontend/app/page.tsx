"use client";
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import LoginForm from "../components/LoginForm";
import { quotesService } from "@/services/quotes.service";
import QuoteDisplay from "../components/QuoteDisplay";

const AVAILABLE_CURRENCIES = {
  // Monedas Fiat de Latinoamérica
  CLP: "Chilean Peso",
  BRL: "Brazilian Real",
  ARS: "Argentine Peso",
  PEN: "Peruvian Sol",
  COP: "Colombian Peso",

  // Principales criptomonedas
  BTC: "Bitcoin",
  ETH: "Ethereum",
  USDT: "Tether",
  USDC: "USD Coin",
  SOL: "Solana",
  ADA: "Cardano",
  DOT: "Polkadot",
  DOGE: "Dogecoin",
  XRP: "Ripple",
};

export default function Home() {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("CLP");
  const [quoteResult, setQuoteResult] = useState<{
    rate: number | null;
    convertedAmount: number | null;
  }>({ rate: null, convertedAmount: null });

  const handleCreateQuote = async () => {
    try {
      const quote = await quotesService.createQuote(
        amount,
        fromCurrency,
        toCurrency
      );
      setQuoteResult({
        rate: quote.rate,
        convertedAmount: quote.convertedAmount,
      });
    } catch (error: any) {
      console.error("Error creating quote", error);
      alert("Error creating quote: " + error.message);
      setQuoteResult({ rate: null, convertedAmount: null });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {user ? (
        <div className="flex space-x-8 p-6 bg-white rounded-lg shadow-md">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-center text-gray-900">
              Cotización
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Monto
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Desde
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {Object.entries(AVAILABLE_CURRENCIES).map(([code, name]) => (
                    <option key={code} value={code}>
                      {code} - {name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hasta
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {Object.entries(AVAILABLE_CURRENCIES).map(([code, name]) => (
                    <option key={code} value={code}>
                      {code} - {name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleCreateQuote}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Crear Cotización
              </button>
            </div>
          </div>
          <QuoteDisplay
            rate={quoteResult.rate}
            convertedAmount={quoteResult.convertedAmount}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
          />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
