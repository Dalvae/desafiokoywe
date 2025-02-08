# API de Cotización de Divisas (Fiat ⇄ Crypto) con NestJS y Next.js

Este proyecto es una API para convertir divisas fiat y criptomonedas, construida con NestJS en el backend y Next.js en el frontend.

## Tecnologías Utilizadas

-   **Backend:** NestJS
-   **Frontend:** Next.js
-   **Base de Datos:** PostgreSQL con Prisma
-   **Inteligencia Artificial:** Flash Gemini con Aider para iteración rápida

## Configuración

1.  Copiar el archivo `.env copy` a `.env`:

    ```bash
    cp .env copy .env
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

La aplicación está configurada para ejecutarse en modo de desarrollo, lo que permite la recarga automática de cambios.

### Puertos de la Aplicación

-   **Backend (NestJS):** Puerto `3000` (configurable mediante la variable de entorno `API_PORT`).
    -   La API del backend se redirige automáticamente a la interfaz de Swagger en `/api`.
-   **Frontend (Next.js):** Puerto `3001` (configurable mediante la variable de entorno `FRONTEND_PORT`).

## Notas

-   Este proyecto fue desarrollado con una iteración rápida utilizando Flash Gemini con Aider.
-   La aplicación se ejecuta en modo de desarrollo, pero se entiende la estructura y el flujo general.
-   La autenticación está implementada con JWT.
-   Prisma se utiliza para interactuar con la base de datos PostgreSQL.
-   El frontend está construido con Next.js y se conecta al backend a través de la variable de entorno `NEXT_PUBLIC_API_URL`.
