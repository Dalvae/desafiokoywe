# API de Cotización de Divisas (Fiat ⇄ Crypto) con NestJS y Next.js

Este proyecto es una API para convertir divisas fiat y criptomonedas, construida con NestJS en el backend y Next.js en el frontend.

## Tecnologías Utilizadas

- **Backend:** NestJS
- **Frontend:** Next.js
- **Base de Datos:** PostgreSQL con Prisma
- **Inteligencia Artificial:** gemini-2.0-flash-001 con Aider para iteración rápida

## Configuración

1.  Copiar el archivo `.env.copy` a `.env`:

    ```bash
    cp .env.copy .env
    ```

    Este archivo contiene las variables de entorno necesarias para la aplicación. Asegúrate de configurar las variables correctamente:

    ```
    # Database
    POSTGRES_USER=user
    POSTGRES_PASSWORD=password
    POSTGRES_DB=quotes_db
    DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}

    # API
    API_PORT=3000
    JWT_SECRET=your_jwt_secret

    # Frontend
    FRONTEND_PORT=3001
    NEXT_PUBLIC_API_URL=http://localhost:${API_PORT}

    AIDER_MODEL=openrouter/google/gemini-2.0-flash-001
    ```

## Ejecución

Para ejecutar la aplicación, utiliza Docker Compose:

```bash
docker-compose up
```

Esto levantará tanto el backend como el frontend, junto con la base de datos PostgreSQL.

La aplicación quedó configurada para ejecutarse en modo de desarrollo.

### Puertos de la Aplicación

- **Backend (NestJS):** Puerto `3000` (configurable mediante la variable de entorno `API_PORT`).
- La API del backend se redirige automáticamente a la interfaz de Swagger en `/api`. Donde se pueden correr diversas pruebas.
- **Frontend (Next.js):** Puerto `3001` (configurable mediante la variable de entorno `FRONTEND_PORT`).

## Tests

Para ejecutar los tests, abre una nueva terminal conectada al contenedor de Docker del backend:

```bash
npm run test:e2e
```

Este comando ejecutará el runner de Jest con la configuración especificada en `test/jest-e2e.json`. Los resultados de las pruebas se mostrarán en la terminal.

_Nota: Asegúrate de que el contenedor del backend esté en ejecución antes de correr los tests._
