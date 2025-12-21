CREATE DATABASE IF NOT EXISTS grano_click;
USE grano_click;

-- Tabla: nosotros
CREATE TABLE IF NOT EXISTS nosotros(
    nosotros_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    photo VARCHAR(255) NOT NULL,
    rol VARCHAR(40) NOT NULL,
    biografia VARCHAR(430) NOT NULL
);

-- Tabla: tipos_usuario
CREATE TABLE IF NOT EXISTS tipos_usuario (
    tipo_usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(150) NOT NULL
);

-- Tabla: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(70) NOT NULL,
    apellidos VARCHAR(70) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    calle_numero VARCHAR(70) NOT NULL,
    municipio VARCHAR(100) NOT NULL,
    colonia VARCHAR(100) NOT NULL,
    codigo_postal VARCHAR(5) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    tipo_usuario_id INT NOT NULL DEFAULT 2,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (correo_electronico),
    FOREIGN KEY (tipo_usuario_id)
        REFERENCES tipos_usuario(tipo_usuario_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE INDEX idx_usuario_correo ON usuarios (correo_electronico);

-- Tabla: productos
CREATE TABLE IF NOT EXISTS productos (
    producto_id INT AUTO_INCREMENT PRIMARY KEY,
    subindice VARCHAR(10) NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    nombre VARCHAR(35) NOT NULL,
    descripcion VARCHAR(70) NOT NULL,
    precio DECIMAL(5,2) NOT NULL,
    imagen_url VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_producto_nombre ON productos (nombre);

-- Tabla: carrito
CREATE TABLE IF NOT EXISTS carrito (
    carrito_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    costo_envio DECIMAL(5,2) NOT NULL,
    total DECIMAL(9,2) NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE INDEX idx_carrito_usuario ON carrito (usuario_id);

-- Tabla: carrito_detalle
CREATE TABLE IF NOT EXISTS carrito_detalle (
    detalle_id INT AUTO_INCREMENT PRIMARY KEY,
    carrito_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(7,2) NOT NULL DEFAULT 0,
    FOREIGN KEY (carrito_id)
        REFERENCES carrito(carrito_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (producto_id)
        REFERENCES productos(producto_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

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
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE INDEX idx_pedido_usuario ON pedidos (usuario_id);

-- Tabla: pedido_detalle
CREATE TABLE IF NOT EXISTS pedido_detalle (
    detalle_id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (pedido_id)
        REFERENCES pedidos(pedido_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (producto_id)
        REFERENCES productos(producto_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Tabla: contactos
CREATE TABLE IF NOT EXISTS contactos(
    folio_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(70) NOT NULL,
    correo VARCHAR(70) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    mensaje TEXT NOT NULL,
    estado ENUM('leido','resuelto','en proceso') NOT NULL,
    nota VARCHAR(300),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
