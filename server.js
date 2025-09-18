const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { login } = require('./usuarios');
const { registrarVoto, obtenerResultados } = require('./votos');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de login
app.post('/login', (req, res) => {
    const { numeroIdentidad } = req.body;
    login(numeroIdentidad, (err, usuario) => {
        if (err) return res.status(500).json({ error: 'Error en la base de datos' });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ usuario });
    });
});

// Ruta para registrar voto
app.post('/votar', (req, res) => {
    const { idUsuario, idCandidato } = req.body;
    registrarVoto(idUsuario, idCandidato, (err, votoId) => {
        if (err) return res.status(500).json({ error: 'Error al registrar voto' });
        res.json({ mensaje: 'Voto registrado', idVoto: votoId });
    });
});

// Ruta para obtener resultados
app.get('/resultados', (req, res) => {
    obtenerResultados((err, resultados) => {
        if (err) return res.status(500).json({ error: 'Error al obtener resultados' });
        res.json({ resultados });
    });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
