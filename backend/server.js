const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const mediationRoutes = require('./routes/mediation');
const statsRoutes = require('./routes/stats');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permite solicitudes desde el frontend
    credentials: true, // Permite el envío de cookies y encabezados de autenticación
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mediations', mediationRoutes);
app.use('/api/stats', statsRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API Funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});