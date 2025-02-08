"use client";

import { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Link from "next/link";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded text-black font-bold"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded text-black font-bold"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
        >
          Registrarse
        </button>
      </form>
      <p className="mt-4">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/" className="text-blue-500">
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
