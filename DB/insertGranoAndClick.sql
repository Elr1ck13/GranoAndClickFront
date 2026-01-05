USE grano_click;

INSERT INTO nosotros values (null,"Emmanuel Aguilar","../assets/4.EmmaFoto1.png","Desarrollador full stack","Soy un ingeniero en Tecnologías 
de la Información, mi pasión e intereses principales son la Inteligencia Artificial, Visión Artificial y la interpretación de grandes datos. 
La orientación que quiero para mi carrera se basa en ayudar en todo lo que pueda a la sociedad, ya sea diseñando soluciones de impacto ambiental 
o encontrando vías alternativas a lo establecido.");

INSERT INTO nosotros values (null,"Maleny Dominguez","../assets/2.MalenyFoto.png","Desarrolladora full stack","Desarrolladora Java Full Stack y 
egresada de Ingeniería en Tecnologías de la Información y Comunicación. Me apasiona crear soluciones web funcionales y bien pensadas, combinando 
lógica, diseño y buenas prácticas. Me impulsa la mejora continua, la curiosidad y el trabajo colaborativo. Disfruto enfrentar retos que requieren 
creatividad y análisis, siempre buscando aportar valor real a cada proyecto en el que participo.");

INSERT INTO nosotros values (null,"Job Hernández","../assets/3.JobFoto.png","Desarrollador full stack","Soy puro movimiento: curiosidad, intención y
 diversión. Me gusta crear cosas que conecten de verdad, que se sientan auténticas y que aporten algo real. No le corro a lo nuevo ni a los retos; al 
 contrario, me impulsan. Mantengo lo simple, lo práctico y lo auténtico, siempre buscando dejar cada proyecto mejor de como lo encontré.");
 
INSERT INTO nosotros values (null,"Erick Valencia","../assets/5.ErickFoto.png","Desarrollador full stack","Soy desarrollador e Ingeniero en Sistemas, 
apasionado por la tecnología y el aprendizaje continuo. Con experiencia en desarrollo web, bases de datos y soporte técnico, he participado en 
proyectos retadores. Me caracterizo por mi curiosidad, responsabilidad y capacidad de trabajo en equipo, siempre estoy dispuesto a enfrentar nuevos 
retos.");

INSERT INTO nosotros values (null,"Brenda Montaño","../assets/1.BrendaFoto.png","Desarrolladora full stack","Soy diseñadora de modas y actualmente me 
encuentro en transición hacia el mundo del desarrollo web, combinando mi visión estética y atención al detalle con habilidades tecnológicas para 
crear experiencias digitales funcionales y visualmente atractivas. Me apasiona la innovación y el diseño desde una perspectiva integral que une 
creatividad y tecnología.");

INSERT INTO nosotros values (null,"Rogelio Luis","../assets/6.RogelioFoto.png","Desarrollador full stack","Mi filosofía de vida: nunca dejar de 
aprender. Me formé como Ingeniero Mecánico y Eléctrico, pero mi pasión por los retos me llevó a pivotar hacia la Ciencia de Datos y el Desarrollo 
Full Stack. Disfruto profundamente enfrentar nuevos desafíos y siempre busco el camino más innovador para optimizar procesos.");


INSERT INTO tipos_usuario values (null,"Admin","Administra todo el sistema.");
INSERT INTO tipos_usuario values (null,"User","Usuario con permisos limitados en el sistema.");


INSERT INTO usuarios 
    (nombres, apellidos, correo_electronico, telefono, fecha_nacimiento, calle_numero, municipio, colonia, codigo_postal, contrasena, tipo_usuario_id) 
VALUES 
    ("Job", "Ibarra", "job@correo.com", "2684597135", "1998-09-13", "calle 07", "Tangamandapio", "centro", "40532", "PassAdmin1$$", 1),
    ("Erick", "Valencia", "Erick@correo.com", "7546813264", "1994-10-30", "calle 123", "Queretaro", "centro", "68751", "PassAdmin2$$", 1),
    ("Brenda", "Montaño", "Brenda@correo.com", "5684215763", "1988-02-14", "calle 51", "CDMX", "centro", "55510", "PassUser1$$", 2),
    ("Maleny", "Dominguez", "Male@correo.com", "9648758421", "1998-10-07", "calle 41", "EDOMEX", "centro", "88754", "PassUser2$$", 2),
    ("Rogelio", "Almazán", "Rogelio@correo.com", "5587569832", "2000-09-09", "calle 75", "CDMX", "centro", "88845", "PassUser3$$", 2);



INSERT INTO productos values (null,"cafe_1","cafe","Espresso","Carga de café espresso intenso y directo",45,"../assets/Producto/cafe_1.png",1);
INSERT INTO productos values (null,"cafe_2","cafe","Americano","100% grano de café espresso rebajado con agua caliente",72,
"../assets/Producto/cafe_2.png",1);
INSERT INTO productos values (null,"cafe_3","cafe","Capuchino","Shot de espresso con leche espumada",82,"../assets/Producto/cafe_3.png",1);
INSERT INTO productos values (null,"cafe_4","cafe","Latte","Carga de café espresso con leche cremosa vaporizada",82,"../assets/Producto/cafe_4.png",
1);
INSERT INTO productos values (null,"cafe_5","cafe","Moca","Espresso con leche y chocolate líquid",75,"../assets/Producto/cafe_5.png",1);
INSERT INTO productos values (null,"cafe_6","cafe","Café de olla","Café mexicano con canela y notas especiadas",70,"../assets/Producto/cafe_6.png",1
);
INSERT INTO productos values (null,"past_1","pasteleria","Cheesecake","Rebanada de cheesecake clásico y cremoso",75,"../assets/Producto/past_1.png",
1);
INSERT INTO productos values (null,"past_2","pasteleria","Brownie","Brownie casero y chocolatoso",45,"../assets/Producto/past_2.png",1);
INSERT INTO productos values (null,"past_3","pasteleria","Croissant de chocolare","Crossaint crujiente con relleno de chocolate",
45,"../assets/Producto/past_3.png",1);
INSERT INTO productos values (null,"past_4","pasteleria","Galleta con chispas","Galleta suave con chispas de chocolate",30,
"../assets/Producto/past_4.png",1);
INSERT INTO productos values (null,"past_5","pasteleria","Panqué de naranja","Delicioso panqué de naranja con trocitos de nuez",65,
"../assets/Producto/past_5.png",1);
INSERT INTO productos values (null,"past_6","pasteleria","Rol de canela","Suave y esponjoso rol con el aroma irresistible de la canela",70,
"../assets/Producto/past_6.png",1);


INSERT INTO carrito (usuario_id, costo_envio, total) VALUES (5, 50.00, 197.00);
INSERT INTO carrito (usuario_id, costo_envio, total) VALUES (3, 70.00, 175.00);
INSERT INTO carrito (usuario_id, costo_envio, total) VALUES (4, 55.00, 192.00);
INSERT INTO carrito (usuario_id, costo_envio, total) VALUES (5, 65.00, 162.00);
INSERT INTO carrito (usuario_id, costo_envio, total) VALUES (4, 20.00, 177.00);


INSERT INTO carrito_detalle values (null,1,1,5,225);
INSERT INTO carrito_detalle values (null,2,5,7,525);
INSERT INTO carrito_detalle values (null,3,4,3,246);
INSERT INTO carrito_detalle values (null,4,6,6,420);
INSERT INTO carrito_detalle values (null,5,3,1,45);


INSERT INTO pedidos values (null,3,"2025-10-15","Recibido",25.20,200.61);
INSERT INTO pedidos values (null,4,"2025-08-20","Pagado",30.75,180.16);
INSERT INTO pedidos values (null,5,"2025-07-14","Entregado",15.15,150.56);
INSERT INTO pedidos values (null,3,"2025-12-07","Cancelado",85.45,300.15);
INSERT INTO pedidos values (null,5,"2025-11-22","Recibido",55.15,145.75);


INSERT INTO pedido_detalle values (null,2,3,3,82);
INSERT INTO pedido_detalle values (null,1,6,2,70);
INSERT INTO pedido_detalle values (null,3,2,5,45);
INSERT INTO pedido_detalle values (null,4,4,5,82);
INSERT INTO pedido_detalle values (null,5,8,4,45);


INSERT INTO contactos VALUES 
(NULL, "Ana López", "ana.lopez@mail.com", "7771234567", "Quiero información de la cafetería", "leido", "Pidió detalles del menú y horarios", "2024-03-15");

INSERT INTO contactos VALUES 
(NULL, "Carlos Pérez", "cperez89@gmail.com", "5512349876", "Me interesa contactar la cafetería", "en proceso", "Solicita cotización para evento pequeño", "2024-06-02");

INSERT INTO contactos VALUES 
(NULL, "María Torres", "maria.torres@correo.com", "7349981122", "Deseo conocer servicios de cafetería", "Resuelto", "Se envió información por correo", "2024-01-28");

INSERT INTO contactos VALUES 
(NULL, "Luis Hernández", "lhernandez@mail.mx", "4425567788", "Busco contacto con la cafetería", "en proceso", "Quiere saber precios de bebidas", "2024-05-10");

INSERT INTO contactos VALUES 
(NULL, "Sofía Ramírez", "sofia.ramirez@gmail.com", "9993456677", "Quiero hablar con la cafetería", "leido", "Pendiente confirmar visita al local", "2024-02-19");
