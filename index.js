import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/products', productsRoutes);
app.use('/auth', authRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: `La ruta ${req.method} ${req.path} no existe en el servidor`
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

