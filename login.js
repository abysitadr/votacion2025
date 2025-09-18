const connection = require('./db');

function login(numeroIdentidad, callback) {
    const query = 'SELECT * FROM usuarios WHERE numero_identidad = ?';
    connection.query(query, [numeroIdentidad], (err, results) => {
        if (err) return callback(err);
        if (results.length > 0) {
            callback(null, results[0]); // usuario encontrado
        } else {
            callback(null, null); // usuario no existe
        }
    });
}

// Ejemplo de uso:
login('0801199901234', (err, usuario) => {
    if (err) console.error(err);
    else if (usuario) console.log('Bienvenido:', usuario.nombre_completo);
    else console.log('Usuario no encontrado');
});
