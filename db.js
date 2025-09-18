const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // tu contraseña si tiene
    database: 'sistema_votaciones_2025', // <- tu DB creada
    port: 3306
});

connection.connect((err) => {
    if (err) console.error('Error de conexión:', err.message);
    else console.log('Conectado a MySQL');
});

module.exports = connection;
