const connection = require('./db');

// Registrar un voto
function registrarVoto(idUsuario, idCandidato, callback) {
    const query = 'INSERT INTO votos (id_usuario, id_candidato) VALUES (?, ?)';
    connection.query(query, [idUsuario, idCandidato], (err, results) => {
        if (err) return callback(err);
        callback(null, results.insertId);
    });
}

// Obtener resultados generales
function obtenerResultados(callback) {
    const query = `
    SELECT c.nombre_candidato, c.cargo, p.siglas AS partido, COUNT(v.id_voto) AS votos
    FROM candidatos c
    LEFT JOIN votos v ON c.id_candidato = v.id_candidato
    LEFT JOIN partidos p ON c.id_partido = p.id_partido
    GROUP BY c.id_candidato
    `;
    connection.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
}

module.exports = { registrarVoto, obtenerResultados };
