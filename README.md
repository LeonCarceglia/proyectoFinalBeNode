# Proyecto Final - API REST con Node.js

API REST desarrollada con Node.js, Express, Firebase y JWT para la gestión de productos y autenticación de usuarios.

## 📋 Descripción

Este proyecto es una API REST completa que permite:
- Autenticación de usuarios mediante Firebase Authentication y JWT
- Gestión de productos (CRUD) con almacenamiento en Firestore
- Protección de rutas mediante middleware de autenticación
- Validación de datos y manejo de errores

## 🚀 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **Firebase** - Base de datos (Firestore) y autenticación
- **JWT (jsonwebtoken)** - Autenticación mediante tokens
- **CORS** - Habilitación de peticiones de origen cruzado
- **Body-parser** - Parsing de datos JSON
- **Dotenv** - Gestión de variables de entorno

## 📁 Estructura del Proyecto

```
ProyectoFinal/
├── config/
│   └── firebase.config.js      # Configuración de Firebase
├── controllers/
│   ├── auth.controller.js      # Controlador de autenticación
│   └── products.controller.js   # Controlador de productos
├── middleware/
│   └── auth.middleware.js       # Middleware de autenticación JWT
├── models/
│   ├── auth.model.js            # Modelo de autenticación
│   └── products.model.js        # Modelo de productos
├── routes/
│   ├── auth.routes.js           # Rutas de autenticación
│   └── products.routes.js       # Rutas de productos
├── services/
│   ├── auth.service.js          # Servicio de autenticación
│   └── products.service.js      # Servicio de productos
├── index.js                     # Punto de entrada
├── package.json                 # Dependencias del proyecto
└── .env                         # Variables de entorno (no incluido en repo)
```

## ⚙️ Configuración
```

## 🏃 Ejecución

### Modo desarrollo

```bash
npm run start
```

El servidor se iniciará en `http://localhost:3000` (o el puerto configurado en `.env`)

## 📡 Endpoints

### Autenticación

#### POST `/auth/login`
Autentica un usuario y devuelve un token JWT.

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "user": {
      "uid": "abc123",
      "email": "usuario@ejemplo.com",
      "emailVerified": false
    }
  },
  "message": "Autenticación exitosa"
}
```

### Productos

#### GET `/api/products`
Obtiene todos los productos (pública).

#### GET `/api/products/:id`
Obtiene un producto por ID (pública).

#### POST `/api/products/create`
Crea un nuevo producto (requiere autenticación).

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "title": "Producto Nuevo",
  "price": 29.99,
  "category": "Electrónica",
  "description": "Descripción opcional"
}
```

#### DELETE `/api/products/:id`
Elimina un producto por ID (requiere autenticación).

**Headers:**
```
Authorization: Bearer <token>
```

## 🔐 Autenticación

Las rutas protegidas requieren un token JWT en el header `Authorization` con el formato:
```
Authorization: Bearer <token>
```

Para obtener el token, realiza un login en `/auth/login`.

Ver `JWT_USAGE.md` para más detalles sobre el uso de JWT.

## 📚 Documentación Adicional

- `FIREBASE_SETUP.md` - Guía para configurar Firebase
- `JWT_USAGE.md` - Guía de uso de autenticación JWT

## 🏗️ Arquitectura

El proyecto sigue una arquitectura en capas:

1. **Rutas** (`routes/`) - Define los endpoints
2. **Controladores** (`controllers/`) - Maneja las peticiones HTTP
3. **Servicios** (`services/`) - Lógica de negocio
4. **Modelos** (`models/`) - Interacción con la base de datos
5. **Middleware** (`middleware/`) - Funcionalidades transversales (autenticación)

