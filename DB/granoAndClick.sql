CREATE DATABASE IF NOT EXISTS grano_click;

USE grano_click;

-- Tabla: tipos_usuario

CREATE  TABLE IF NOT EXISTS nosotros(
	nosotros_id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(30),
	photo VARCHAR(255),
    rol VARCHAR(20),
    biografia VARCHAR(430)
);

ALTER TABLE nosotros MODIFY rol VARCHAR(40);

CREATE TABLE IF NOT EXISTS tipos_usuario (
    tipo_usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(150)
);

-- Tabla: usuarios

CREATE TABLE IF NOT EXISTS usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(70) NOT NULL,
    apellidos VARCHAR(70) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    telefono VARCHAR(10),
    fecha_nacimiento DATE,
    municipio VARCHAR(100),
    colonia VARCHAR(100),
    codigo_postal VARCHAR(5),
	contrasena VARCHAR(255) NOT NULL,
    tipo_usuario_id INT NOT NULL DEFAULT 2,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (correo_electronico),
    FOREIGN KEY (tipo_usuario_id)
        REFERENCES tipos_usuario(tipo_usuario_id)
) ;

CREATE INDEX idx_usuario_correo
ON usuarios (correo_electronico);

-- Tabla: productos
CREATE TABLE IF NOT EXISTS productos (
    producto_id INT AUTO_INCREMENT PRIMARY KEY,
	subindice VARCHAR(10),
    categoria VARCHAR(20),
    nombre VARCHAR(35) NOT NULL,
    descripcion VARCHAR(70),
    precio DECIMAL(5,2) NOT NULL,
    imagen_url VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_producto_nombre
ON productos (nombre);

-- Tabla: carrito


CREATE TABLE IF NOT EXISTS carrito (
    carrito_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    costo_envio DECIMAL(5,2) NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

CREATE TABLE IF NOT EXISTS carrito (
    carrito_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    costo_envio DECIMAL(5,2) NOT NULL,
    total DECIMAL(9,2) NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

CREATE TABLE IF NOT EXISTS carrito_detalle (
    detalle_id INT AUTO_INCREMENT PRIMARY KEY,
    carrito_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(7,2),
    FOREIGN KEY (carrito_id) REFERENCES carrito(carrito_id),
    FOREIGN KEY (producto_id) REFERENCES productos(producto_id)
);

CREATE INDEX idx_carrito_usuario
ON carrito (usuario_id);

-- Tabla: pedidos

CREATE TABLE IF NOT EXISTS pedidos (
    pedido_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pagado','recibido','preparando','en camino','entregado','cancelado') NOT NULL,
    costo_envio DECIMAL(5,2) NOT NULL,
    total DECIMAL(9,2) NOT NULL,
    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
);

CREATE INDEX idx_pedido_usuario
ON pedidos (usuario_id);

-- Tabla: detalle_pedido

CREATE TABLE IF NOT EXISTS pedido_detalle (
    detalle_id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(5,2) NOT NULL,

    FOREIGN KEY (pedido_id)
        REFERENCES pedidos(pedido_id),
    FOREIGN KEY (producto_id)
        REFERENCES productos(producto_id)
);

-- Table: contacto

CREATE TABLE IF NOT EXISTS contactos(
	folio_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(70),
    correo VARCHAR(70),
    telefono VARCHAR(10),
    mensaje TEXT,
    estado ENUM('leido','resuelto','en proceso') NOT NULL,
    nota VARCHAR(300),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
