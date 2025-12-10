# Uso de JWT en el Proyecto

Este documento explica cómo usar la autenticación JWT en el proyecto.

## Flujo de Autenticación

### 1. Login (Obtener Token)

**Endpoint:** `POST /auth/login`

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Respuesta exitosa (200):**
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

**Respuesta de error (401):**
```json
{
  "success": false,
  "error": "Error de autenticación",
  "message": "Credenciales inválidas"
}
```

### 2. Usar el Token en Peticiones Protegidas

Una vez obtenido el token, debes incluirlo en el header `Authorization` de todas las peticiones a rutas protegidas.

**Formato del header:**
```
Authorization: Bearer <token>
```

## Rutas Protegidas

Las siguientes rutas requieren autenticación (token Bearer):

- `POST /api/products/create` - Crear un nuevo producto
- `DELETE /api/products/:id` - Eliminar un producto

## Rutas Públicas

Las siguientes rutas NO requieren autenticación:

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto por ID
- `POST /auth/login` - Iniciar sesión

## Ejemplos de Uso

### Ejemplo 1: Login y obtener token

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "password123"
  }'
```

### Ejemplo 2: Crear producto (requiere token)

```bash
# Primero obtén el token con el login
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Luego usa el token para crear un producto
curl -X POST http://localhost:3000/api/products/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Producto Nuevo",
    "price": 29.99,
    "category": "Electrónica",
    "description": "Descripción del producto"
  }'
```

### Ejemplo 3: Eliminar producto (requiere token)

```bash
curl -X DELETE http://localhost:3000/api/products/abc123 \
  -H "Authorization: Bearer $TOKEN"
```

### Ejemplo 4: Obtener productos (pública, no requiere token)

```bash
curl -X GET http://localhost:3000/api/products
```

## Configuración

El token JWT se configura mediante variables de entorno en el archivo `.env`:

```env
JWT_SECRET=tu_secret_jwt_super_seguro_aqui
JWT_EXPIRES_IN=24h
```

- `JWT_SECRET`: Clave secreta para firmar los tokens
- `JWT_EXPIRES_IN`: Tiempo de expiración del token (por defecto: 24h)
