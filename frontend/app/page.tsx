"use client";

import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {user ? (
        <div>
          <h1 className="text-2xl font-bold">Pantalla de Cotización</h1>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
