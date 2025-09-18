const connection = require('./db');

function login(numeroIdentidad, callback) {
    const query = 'SELECT * FROM usuarios WHERE numero_identidad = ?';
    connection.query(query, [numeroIdentidad], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) return callback(null, null); // usuario no existe
        callback(null, results[0]); // devuelve datos del usuario
    });
}

module.exports = { login };
