-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS sistema_votaciones_2025;
USE sistema_votaciones_2025;

-- Tabla de usuarios (login con identidad y nombre)
USE sistema_votaciones_2025;
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    numero_identidad VARCHAR(15) NOT NULL UNIQUE,
    nombre_completo VARCHAR(100) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de partidos políticos
USE sistema_votaciones_2025;
CREATE TABLE partidos (
    id_partido INT AUTO_INCREMENT PRIMARY KEY,
    nombre_partido VARCHAR(100) NOT NULL,
    siglas VARCHAR(20) NOT NULL,
    color VARCHAR(20) NOT NULL
);

-- Tabla de candidatos (puede ser presidente, diputado, alcalde)
USE sistema_votaciones_2025;
CREATE TABLE candidatos (
    id_candidato INT AUTO_INCREMENT PRIMARY KEY,
    nombre_candidato VARCHAR(100) NOT NULL,
    cargo ENUM('presidente', 'diputado', 'alcalde') NOT NULL,
    departamento VARCHAR(50) DEFAULT NULL,
    municipio VARCHAR(50) DEFAULT NULL,
    id_partido INT,
    FOREIGN KEY (id_partido) REFERENCES partidos(id_partido)
);

-- Tabla de votos
USE sistema_votaciones_2025;
CREATE TABLE votos (
    id_voto INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_candidato INT NOT NULL,
    fecha_voto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_candidato) REFERENCES candidatos(id_candidato)
);

-- =======================
-- DATOS DE EJEMPLO
-- =======================

-- Insertar partidos
USE sistema_votaciones_2025;
INSERT INTO partidos (nombre_partido, siglas, color) VALUES
('Partido Libertad y Refundación', 'LIBRE', '#e53e3e'),
('Partido Nacional', 'PNH', '#1e40af'),
('Partido Liberal', 'PLH', '#dc2626'),
('Partido Salvador de Honduras', 'PSH', '#facc15');

-- Insertar candidatos a presidente
USE sistema_votaciones_2025;
INSERT INTO candidatos (nombre_candidato, cargo, id_partido) VALUES
('Xiomara Castro', 'presidente', 1),
('Nasry Asfura', 'presidente', 2),
('Yani Rosenthal', 'presidente', 3),
('Salvador Nasralla', 'presidente', 4);

-- Insertar candidatos a diputados (ejemplo en Francisco Morazán)
USE sistema_votaciones_2025;
INSERT INTO candidatos (nombre_candidato, cargo, departamento, id_partido) VALUES
('Diputado Juan Pérez', 'diputado', 'Francisco Morazán', 1),
('Diputado María López', 'diputado', 'Francisco Morazán', 2),
('Diputado Carlos Torres', 'diputado', 'Francisco Morazán', 3);

-- Insertar candidatos a alcalde (ejemplo Tegucigalpa y San Pedro Sula)
USE sistema_votaciones_2025;
INSERT INTO candidatos (nombre_candidato, cargo, departamento, municipio, id_partido) VALUES
('Alcalde Pedro Sánchez', 'alcalde', 'Francisco Morazán', 'Tegucigalpa', 1),
('Alcalde Ana Gómez', 'alcalde', 'Francisco Morazán', 'Tegucigalpa', 2),
('Alcalde Luis Martínez', 'alcalde', 'Cortés', 'San Pedro Sula', 3);

-- Insertar usuarios ficticios (login)
USE sistema_votaciones_2025;
INSERT INTO usuarios (numero_identidad, nombre_completo) VALUES
('0801199901234', 'Juan López'),
('0801200005678', 'María Hernández'),
('0801198709999', 'Carlos Ramírez');

-- Insertar votos de prueba
USE sistema_votaciones_2025;
INSERT INTO votos (id_usuario, id_candidato) VALUES
(1, 1), -- Juan López votó por Xiomara Castro
(2, 2), -- María Hernández votó por Nasry Asfura
(3, 4); -- Carlos Ramírez votó por Salvador Nasralla
-- Nota: En un entorno real, los votos se registrarían dinámicamente y no se insertarían de esta manera.