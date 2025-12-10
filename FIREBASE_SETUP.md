# Configuración de Firebase

Este documento explica cómo configurar Firebase para el proyecto.

## Pasos para configurar Firebase

### 1. Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto" o "Add project"
3. Ingresa un nombre para tu proyecto (ej: `proyecto-final-nodejs`)
4. Sigue los pasos del asistente para crear el proyecto

### 2. Habilitar Firestore Database

1. En la consola de Firebase, ve a "Firestore Database" en el menú lateral
2. Haz clic en "Crear base de datos" o "Create database"
3. Selecciona el modo de producción (puedes cambiar a modo de prueba después)
4. Elige una ubicación para tu base de datos (ej: `us-central`)
5. Haz clic en "Habilitar" o "Enable"

### 3. Crear la colección de productos

1. En Firestore Database, haz clic en "Comenzar colección" o "Start collection"
2. Ingresa el ID de la colección: `products`
3. Agrega el primer documento con los siguientes campos:

   **ID del documento:** (dejar que Firebase lo genere automáticamente)

   **Campos:**
   - `title` (string): "Ejemplo de Producto"
   - `price` (number): 29.99
   - `category` (string): "Electrónica"
   - `description` (string, opcional): "Descripción del producto"
   - `image` (string, opcional): "https://ejemplo.com/imagen.jpg"
   - `createdAt` (timestamp): (Firebase lo agregará automáticamente)
   - `updatedAt` (timestamp): (Firebase lo agregará automáticamente)

4. Haz clic en "Guardar" o "Save"

### 4. Habilitar Firebase Authentication

1. En la consola de Firebase, ve a "Authentication" en el menú lateral
2. Haz clic en "Comenzar" o "Get started"
3. Ve a la pestaña "Sign-in method"
4. Habilita "Correo electrónico/Contraseña" (Email/Password)
5. Haz clic en "Guardar" o "Save"

### 5. Obtener las credenciales de Firebase

1. En la consola de Firebase, ve a "Configuración del proyecto" (ícono de engranaje)
2. Desplázate hacia abajo hasta "Tus aplicaciones"
3. Haz clic en el ícono de `</>` (Web) para agregar una aplicación web
4. Registra tu aplicación con un nombre (ej: "Proyecto Final Web")
5. Copia las credenciales que se muestran (firebaseConfig)

### 6. Configurar variables de entorno

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza los valores de las variables de Firebase con tus credenciales:

```env
FIREBASE_API_KEY=tu_api_key_real
FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef
```

3. Configura el JWT_SECRET con una cadena segura (puedes generar una con: `openssl rand -base64 32`)

```env
JWT_SECRET=tu_secret_jwt_super_seguro_aqui
JWT_EXPIRES_IN=24h
```

### 7. Crear un usuario de prueba

1. En Firebase Console, ve a "Authentication"
2. Ve a la pestaña "Users"
3. Haz clic en "Agregar usuario" o "Add user"
4. Ingresa un email y password de prueba
5. Guarda las credenciales para probar el login

## Estructura de datos en Firestore

### Colección: `products`

Cada documento en la colección `products` debe tener la siguiente estructura:

```javascript
{
  title: "Nombre del producto",
  price: 29.99,  // número
  category: "Categoría",
  description: "Descripción opcional",
  image: "URL de imagen opcional",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Reglas de seguridad de Firestore (Opcional)

Para desarrollo, puedes usar estas reglas básicas. **NO uses estas reglas en producción**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Para aplicar las reglas:
1. Ve a Firestore Database
2. Haz clic en la pestaña "Reglas" o "Rules"
3. Pega las reglas y haz clic en "Publicar" o "Publish"

## Verificación

Una vez configurado, puedes verificar que todo funciona:

1. Ejecuta el servidor: `npm run start`
2. Prueba crear un producto con POST `/api/products/create`
3. Prueba obtener productos con GET `/api/products`
4. Prueba el login con POST `/auth/login`

## Notas importantes

- **Nunca subas el archivo `.env` a un repositorio público**
- Agrega `.env` a tu `.gitignore`
- En producción, usa variables de entorno del servidor en lugar del archivo `.env`
- El JWT_SECRET debe ser una cadena larga y aleatoria

