const { Restaurante } = require("../models");

async function anadirRestaurante() {
    /* 
     PARA AÑADIR FOTO RESTAURANTE

     1r paso añadir imagen en la carpeta upload (nombre unico)
     2n en foto_restaurante añadir el siguiente texto http://localhost:3000/api/uploads/ + <nombre foto añadida en uopload>
     (AÑADIR EXTENSION IMAGEN EJEMPLO .jpg)
     */
    
    try {
        const restObj = [
            //1 AMERICANO
            {
                nombre: 'Brooklyn Burger Bar',
                descripcio: 'Un lugar acogedor que sirve las mejores hamburguesas al estilo neoyorquino, con ingredientes frescos y creativos.',
                correo: 'info@brooklynburger.com',
                password: 'test123',
                telefono: "999999999",
                dieta: 0,
                direccion: "Carrer Miranda",
                numero: "72",
                cp: "08036",
                foto_restaurante: 'http://localhost:3000/api/uploads/americano1.jpg',
                tipos_cocina: [1]
            },
            {
                nombre: 'Texas BBQ House',
                descripcio: 'Un auténtico asador texano que ofrece una amplia selección de carnes a la parrilla, con sabores ahumados irresistibles.',
                correo: 'info@texasbbqhouse.com',
                password: 'test123',
                telefono: "999929999",
                dieta: 0,
                direccion: "Avenida del Oeste",
                numero: "50",
                cp: "08037",
                foto_restaurante: 'http://localhost:3000/api/uploads/americano2.jpg',
                tipos_cocina: [1]
            },
            {
                nombre: 'Manhattan Diner',
                descripcio: 'Un clásico diner inspirado en los años dorados de Nueva York, donde puedes disfrutar de platos típicos americanos las 24 horas del día.',
                correo: 'contact@manhattandiner.com',
                password: 'test123',
                telefono: "999929999",
                dieta: 0,
                direccion: "Avenida Pareja",
                numero: "123",
                cp: "08032",
                foto_restaurante: 'http://localhost:3000/api/uploads/americano3.jpg',
                tipos_cocina: [1]
            },
            {
                nombre: "California Dreaming",
                descripcio: "Un restaurante con ambiente relajado que sirve platos inspirados en la cocina de la costa oeste de Estados Unidos, como ensaladas frescas y pescado a la parrilla.",
                correo: "info@californiadreaming.com",
                password: "test123",
                telefono: "932999999",
                dieta: 0,
                direccion: "Paseo del Aire",
                numero: "16",
                cp: "08022",
                foto_restaurante: "http://localhost:3000/api/uploads/americano4.jpg",
                tipos_cocina: [1]
            },
            {
                nombre: "Chicago Deep Dish Pizza",
                descripcio: "Un lugar especializado en la famosa pizza estilo Chicago, con bordes altos y mucho queso, junto con otros platos típicos de la cocina americana.",
                correo: "info@chicagopizza.com",
                password: "test123",
                telefono: "932999999",
                dieta: 0,
                direccion: "Calle Pillo",
                numero: "43",
                cp: "08038",
                foto_restaurante: "http://localhost:3000/api/uploads/americano5.jpg",
                tipos_cocina: [1]
            },

            //2 CHINA

            {
                nombre: 'Xinatown',
                descripcio: 'Restaurante con las mejores comida china y japonesa',
                correo: 'xinatown@test123.com',
                password: 'test123',
                telefono: "999929999",
                dieta: 0,
                direccion: "Calle chinatown",
                numero: "42",
                cp: "08002",
                foto_restaurante: 'http://localhost:3000/api/uploads/china1.jpg',
                tipos_cocina: [2, 6]
            },
            {
                nombre: 'Dragón Rojo',
                descripcio: 'Un lugar emblemático que ofrece auténtica cocina china en un ambiente acogedor y elegante.',
                correo: 'info@dragonrojo.com',
                password: 'test123',
                telefono: "999929999",
                dieta: 0,
                direccion: "Avenida de la Prosperidad",
                numero: "15",
                cp: "08003",
                foto_restaurante: 'http://localhost:3000/api/uploads/china2.jpg',
                tipos_cocina: [2]
            },
            {
                nombre: 'Gran Muralla',
                descripcio: 'Un lugar familiar que sirve platos chinos clásicos con un toque de modernidad.',
                correo: 'reservas@granmuralla.com',
                password: 'test123',
                telefono: "999929999",
                dieta: 0,
                direccion: "Calle de la Luna",
                numero: "20",
                cp: "08004",
                foto_restaurante: 'http://localhost:3000/api/uploads/china3.jpg',
                tipos_cocina: [2]
            },
            {
                nombre: 'El Jardín del Bambú',
                descripcio: 'Un oasis de sabores asiáticos donde puedes disfrutar de una variedad de platos chinos exquisitos.',
                correo: 'info@jardindelbambu.com',
                password: 'test123',
                telefono: "999929999",
                dieta: 0,
                direccion: "Plaza del Sol",
                numero: "5",
                cp: "08005",
                foto_restaurante: 'http://localhost:3000/api/uploads/china4.jpg',
                tipos_cocina: [2]
            },
            {
                nombre: 'Palacio de Jade',
                descripcio: 'Un restaurante sofisticado que ofrece una fusión de cocina china tradicional y contemporánea.',
                correo: 'reservas@palaciodejade.com',
                password: 'test123',
                telefono: "999929999",
                dieta: 0,
                direccion: "Calle Barcelona",
                numero: "12",
                cp: "08006",
                foto_restaurante: 'http://localhost:3000/api/uploads/china5.jpg',
                tipos_cocina: [2]
            },

            // 3 GRIEGO

            {
                nombre: "Opa! Greek Taverna",
                descripcio: "Auténtica experiencia culinaria griega con música y baile.",
                correo: "info@opagreek.com",
                password: "test123",
                telefono: "555111222",
                dieta: 0,
                direccion: "Calle Grecia",
                numero: "123",
                cp: "08005",
                foto_restaurante: "http://localhost:3000/api/uploads/griego1.jpg",
                tipos_cocina: [3]
            },
            {
                nombre: "Mediterranean Delight",
                descripcio: "Sabores frescos y auténticos de la cocina mediterránea griega.",
                correo: "info@mediterraneandelight.com",
                password: "test123",
                telefono: "555333444",
                dieta: 0,
                direccion: "Avenida Olivo",
                numero: "456",
                cp: "08004",
                foto_restaurante: "http://localhost:3000/api/uploads/griego2.jpg",
                tipos_cocina: [3]
            },
            {
                nombre: "Zeus Tavern",
                descripcio: "Comida griega casera en un ambiente familiar y acogedor.",
                correo: "contact@zeustavern.com",
                password: "test123",
                telefono: "555666777",
                dieta: 0,
                direccion: "Plaza Central",
                numero: "789",
                cp: "08003",
                foto_restaurante: "http://localhost:3000/api/uploads/griego3.jpg",
                tipos_cocina: [3]
            },
            {
                nombre: "Olive Grove Restaurant",
                descripcio: "Cocina griega tradicional con ingredientes frescos y sabrosos.",
                correo: "reservations@olivegrove.com",
                password: "test123",
                telefono: "555999333",
                dieta: 0,
                direccion: "Calle Olive",
                numero: "101",
                cp: "08002",
                foto_restaurante: "http://localhost:3000/api/uploads/griego4.jpg",
                tipos_cocina: [3]
            },
            {
                nombre: "Dionysus Grill",
                descripcio: "Experiencia gastronómica griega con una variedad de platos y vinos.",
                correo: "info@dionysusgrill.com",
                password: "test123",
                telefono: "555123456",
                dieta: 0,
                direccion: "Calle del Sabor",
                numero: "324",
                cp: "08001",
                foto_restaurante: "http://localhost:3000/api/uploads/griego5.jpg",
                tipos_cocina: [3]
            },

            // 4 INDIO

            {
                nombre: "Taj Mahal Indian Restaurant",
                descripcio: "Auténtica comida india en un ambiente acogedor",
                correo: "info@tajmahal.com",
                password: "test123",
                telefono: "555123456",
                dieta: 0,
                direccion: "Calle Principal",
                numero: "123",
                cp: "08010",
                foto_restaurante: "http://localhost:3000/api/uploads/indio1.jpg",
                tipos_cocina: [4]
            },
            {
                nombre: "Spice Garden",
                descripcio: "Experiencia culinaria de sabores intensos y especias frescas.",
                correo: "info@spicegarden.com",
                password: "test123",
                telefono: "555123456",
                dieta: 0,
                direccion: "Avenida Central",
                numero: "456",
                cp: "08009",
                foto_restaurante: "http://localhost:3000/api/uploads/indio2.jpg",
                tipos_cocina: [4]
            },
            {
                nombre: "Namaste Indian Cuisine",
                descripcio: "Platos tradicionales indios con un toque moderno.",
                correo: "contact@namaste.com",
                password: "test123",
                telefono: "555123456",
                dieta: 0,
                direccion: "Plaza Principal",
                numero: "789",
                cp: "08008",
                foto_restaurante: "http://localhost:3000/api/uploads/indio3.jpg",
                tipos_cocina: [4]
            },
            {
                nombre: "Maharaja Palace",
                descripcio: "Elegante restaurante con auténtica cocina del norte de la India.",
                correo: "reservations@maharajapalace.com",
                password: "test123",
                telefono: "555123456",
                dieta: 0,
                direccion: "Calle Real",
                numero: "101",
                cp: "08007",
                foto_restaurante: "http://localhost:3000/api/uploads/indio4.jpg",
                tipos_cocina: [4]
            },
            {
                nombre: "Curry House",
                descripcio: "Comida india fresca y sabrosa en un ambiente acogedor.",
                correo: "info@curryhouse.com",
                password: "test123",
                telefono: "555123456",
                dieta: 0,
                direccion: "Calle del Sabor",
                numero: "321",
                cp: "08006",
                foto_restaurante: "http://localhost:3000/api/uploads/indio5.jpg",
                tipos_cocina: [4]
            },

            //5 ITALIANO

            {
                nombre: "Luccio",
                descripcio: "Restaurante de cocina tradicional italiana",
                correo: "info@luccio.com",
                password: "test123",
                telefono: "911111111",
                dieta: 0,
                direccion: "Calle Cava Baja",
                numero: "35",
                cp: "08005",
                foto_restaurante: "http://localhost:3000/api/uploads/italiano1.jpg",
                tipos_cocina: [5]
            },
            {
                nombre: "Pizzana",
                descripcio: "Mejores pizzas de toda Barcelona, aqui",
                correo: "info@pizzana.com",
                password: "test123",
                telefono: "922222222",
                dieta: 0,
                direccion: "Calle Cuchilleros",
                numero: "17",
                cp: "08006",
                foto_restaurante: "http://localhost:3000/api/uploads/italiano2.jpg",
                tipos_cocina: [5]
            },
            {
                nombre: "Pastacuore",
                descripcio: "La pasta de verdad aqui",
                correo: "info@pastacuore.com",
                password: "test123",
                telefono: "933333333",
                dieta: 0,
                direccion: "Calle Cuchilleros",
                numero: "17",
                cp: "08007",
                foto_restaurante: "http://localhost:3000/api/uploads/italiano3.jpg",
                tipos_cocina: [5]
            },
            {
                nombre: "La Trattoria del Nonno",
                descripcio: "Un acogedor rincón de Italia en tu ciudad, donde podrás disfrutar de platos caseros preparados con los ingredientes más frescos y auténticos.",
                correo: "info@latrattoriadelnonno.com",
                password: "test123",
                telefono: "933333333",
                dieta: 0,
                direccion: "Via Roma",
                numero: "10",
                cp: "08008",
                foto_restaurante: "http://localhost:3000/api/uploads/italiano4.jpg",
                tipos_cocina: [5]
            },
            {
                nombre: "Pizzería Da Vinci",
                descripcio: "Un lugar vibrante que ofrece una amplia selección de deliciosas pizzas artesanales, pastas frescas y otros platos clásicos de la cocina italiana.",
                correo: "info@pizzeriadavinci.com",
                password: "test123",
                telefono: "933333333",
                dieta: 0,
                direccion: "Plaza Marco",
                numero: "5",
                cp: "08011",
                foto_restaurante: "http://localhost:3000/api/uploads/italiano5.jpg",
                tipos_cocina: [5]
            },

            //6 JAPONES

            {
                nombre: 'Sushi Zen',
                descripcio: 'Un oasis de sushi fresco y creativo, donde los chefs expertos preparan auténticas delicias japonesas con los mejores ingredientes.',
                correo: 'info@sushizen.com',
                password: 'test123',
                telefono: "999999999",
                dieta: 0,
                direccion: "Carrer Industria",
                numero: "86",
                cp: "08035",
                foto_restaurante: 'http://localhost:3000/api/uploads/japones1.jpg',
                tipos_cocina: [6]
            },
            {
                nombre: 'Ramen Master',
                descripcio: 'Un lugar acogedor que sirve los mejores cuencos de ramen de la ciudad, con caldos ricos y fideos caseros que te transportarán a Japón.',
                correo: 'info@ramenmaster.com',
                password: 'test123',
                telefono: "999929999",
                dieta: 0,
                direccion: "calle Frigo",
                numero: "2",
                cp: "08013",
                foto_restaurante: 'http://localhost:3000/api/uploads/japones2.jpg',
                tipos_cocina: [6]
            },
            {
                nombre: 'Tempura House',
                descripcio: 'Un templo de la tempura donde puedes disfrutar de esta deliciosa especialidad japonesa, con una amplia variedad de ingredientes frescos y crujientes.',
                correo: 'info@tempurahouse.com',
                password: 'test123',
                telefono: "999929999",
                dieta: 0,
                direccion: "avenida Caballero",
                numero: "96",
                cp: "08024",
                foto_restaurante: 'http://localhost:3000/api/uploads/japones3.jpg',
                tipos_cocina: [6]
            },
            {
                nombre: "Izakaya Bar",
                descripcio: "Un auténtico izakaya japonés que ofrece una experiencia gastronómica única, con una amplia selección de platos pequeños para compartir y sake de alta calidad.",
                correo: "info@izakayabar.com",
                password: "test123",
                telefono: "932999999",
                dieta: 0,
                direccion: "Calle Azul",
                numero: "30",
                cp: "08010",
                foto_restaurante: "http://localhost:3000/api/uploads/japones4.jpg",
                tipos_cocina: [6]
            },
            {
                nombre: "Teppanyaki Grill",
                descripcio: "Un emocionante lugar donde puedes disfrutar de la espectacular cocina teppanyaki, con chefs habilidosos que preparan tus platos favoritos justo frente a ti.",
                correo: "info@teppanyakigrill.com",
                password: "test123",
                telefono: "932999999",
                dieta: 0,
                direccion: "Calle Mayor",
                numero: "15",
                cp: "08031",
                foto_restaurante: "http://localhost:3000/api/uploads/japones5.jpg",
                tipos_cocina: [6]
            },

            //7 MEXICANO
            {
                nombre: "Taco riko",
                descripcio: "Restaurante de cocina creativa mexicana",
                correo: "poblenou@test123.com",
                password: "test123",
                telefono: "936111111",
                dieta: 0,
                direccion: "Rambla del Poblenou",
                numero: "98",
                cp: "08018",
                foto_restaurante: "http://localhost:3000/api/uploads/mexicano1.jpg",
                tipos_cocina: [7]
            },
            {
                nombre: "El matador",
                descripcio: "Restaurante vegetariano en Sants",
                correo: "sants@test123.com",
                password: "test123",
                telefono: "937777777",
                dieta: 0,
                direccion: "Carrer de Sants",
                numero: "79",
                cp: "08014",
                foto_restaurante: "http://localhost:3000/api/uploads/mexicano2.jpg",
                tipos_cocina: [7]
            },
            {
                nombre: "Asando y riendo",
                descripcio: "Restaurante de cocina mexicana",
                correo: "eixample@test123.com",
                password: "test123",
                telefono: "938888888",
                dieta: 0,
                direccion: "Passeig de Gràcia",
                numero: "45",
                cp: "08007",
                foto_restaurante: "http://localhost:3000/api/uploads/mexicano3.jpg",
                tipos_cocina: [7]
            },
            {
                nombre: "Rata de tres patas",
                descripcio: "Todo méxico dentro de nuestro local",
                correo: "lescorts@gmail.com",
                password: "test123",
                telefono: "939999999",
                dieta: 0,
                direccion: "Travessera de Les Corts",
                numero: "322",
                cp: "08028",
                foto_restaurante: "http://localhost:3000/api/uploads/mexicano4.jpg",
                tipos_cocina: [7]
            },
            {
                nombre: "Sabores de México",
                descripcio: "Auténtica cocina mexicana con un toque contemporáneo.",
                correo: "saboresdemexico@test.com",
                password: "test123",
                telefono: "939999999",
                dieta: 0,
                direccion: "Calle Valencia",
                numero: "25",
                cp: "08029",
                foto_restaurante: "http://localhost:3000/api/uploads/mexicano5.jpg",
                tipos_cocina: [7]
            },

            // 8 MARROQUI

            {
                nombre: "Al-Andalus Moroccan Cuisine",
                descripcio: "Delicias marroquíes auténticas en un ambiente exquisitamente decorado con influencias de Al-Andalus.",
                correo: "info@alandalus.com",
                password: "test123",
                telefono: "555111222",
                dieta: 0,
                direccion: "Calle Alhambra",
                numero: "45",
                cp: "08011",
                foto_restaurante: "http://localhost:3000/api/uploads/marroqui1.jpg",
                tipos_cocina: [8]
            },
            {
                nombre: "Marrakech Spice House",
                descripcio: "Sabores auténticos de Marrakech en un entorno encantador con especias exóticas y ambiente vibrante.",
                correo: "info@marrakechspice.com",
                password: "test123",
                telefono: "555333444",
                dieta: 0,
                direccion: "Avenida Medina",
                numero: "78",
                cp: "08012",
                foto_restaurante: "http://localhost:3000/api/uploads/marroqui2.jpg",
                tipos_cocina: [8]
            },
            {
                nombre: "Oasis del Desierto",
                descripcio: "Sumérgete en la experiencia culinaria del desierto con platos tradicionales marroquíes en un oasis de tranquilidad.",
                correo: "info@oasisdesierto.com",
                password: "test123",
                telefono: "555666777",
                dieta: 0,
                direccion: "Plaza Sahara",
                numero: "12",
                cp: "08013",
                foto_restaurante: "http://localhost:3000/api/uploads/marroqui3.jpg",
                tipos_cocina: [8]
            },
            {
                nombre: "Casablanca Flavors",
                descripcio: " Inspirado en la rica diversidad culinaria de Casablanca, este restaurante ofrece una experiencia gastronómica única.",
                correo: "info@casablancaflavors.com",
                password: "test123",
                telefono: "555999333",
                dieta: 0,
                direccion: "Plaza Hassan II",
                numero: "33",
                cp: "08014",
                foto_restaurante: "http://localhost:3000/api/uploads/marroqui4.jpg",
                tipos_cocina: [8]
            },
            {
                nombre: "Medina Palace",
                descripcio: "Sumérgete en la majestuosidad de la medina con auténtica cocina marroquí servida en un palacio restaurado.",
                correo: "info@medinapalace.com",
                password: "test123",
                telefono: "555123456",
                dieta: 0,
                direccion: "Calle Medina",
                numero: "55",
                cp: "08015",
                foto_restaurante: "http://localhost:3000/api/uploads/marroqui5.jpg",
                tipos_cocina: [8]
            },

            //9 ESPAÑOL

            {
                nombre: 'Paco',
                descripcio: 'Siempre podras contar con nosotros',
                correo: 'info@paco.com',
                password: 'test123',
                telefono: "999999999",
                dieta: 0,
                direccion: "Carrer industria",
                numero: "56",
                cp: "08032",
                foto_restaurante: 'http://localhost:3000/api/uploads/espanol1.jpg',
                tipos_cocina: [9]
            },
            {
                nombre: 'Don Kamaron',
                descripcio: 'Mejor restaurante de buenos camarón',
                correo: 'donkamaron@test123.com',
                password: 'test123',
                telefono: "999929999",
                dieta: 0,
                direccion: "calle test",
                numero: "42",
                cp: "08032",
                foto_restaurante: 'http://localhost:3000/api/uploads/espanol2.jpg',
                tipos_cocina: [9]
            },
            {
                nombre: 'La esquinica',
                descripcio: 'Bar de la esquinica con las mejores bravas.',
                correo: 'esquinica@test123.com',
                password: 'test123',
                telefono: "999929999",
                dieta: 0,
                direccion: "Passeig de Fabra i Puig",
                numero: "296",
                cp: "08031",
                foto_restaurante: 'http://localhost:3000/api/uploads/espanol3.jpg',
                tipos_cocina: [9]
            },
            {
                nombre: "La Barceloneta",
                descripcio: "Restaurante de cocina mediterránea",
                correo: "labarceloneta@test123.com",
                password: "test123",
                telefono: "932999999",
                dieta: 0,
                direccion: "Calle Marina",
                numero: "105",
                cp: "08001",
                foto_restaurante: "http://localhost:3000/api/uploads/espanol4.jpg",
                tipos_cocina: [9]
            },
            {
                nombre: "La Tasca Española",
                descripcio: "Un rincón de España en tu ciudad, donde podrás disfrutar de la auténtica cocina española.",
                correo: "info@latascaespanola.com",
                password: "test123",
                telefono: "932999999",
                dieta: 0,
                direccion: "Calle Mayor",
                numero: "10",
                cp: "08030",
                foto_restaurante: "http://localhost:3000/api/uploads/espanol5.jpg",
                tipos_cocina: [9]
            },

            //10 TAILANDESA

            {
                nombre: 'Thai Orchid',
                descripcio: 'Un destino culinario que te transportará a Tailandia con su auténtica cocina tailandesa, llena de sabores exóticos y especias frescas.',
                correo: 'info@thaiorchid.com',
                password: 'test123',
                telefono: "999999999",
                dieta: 0,
                direccion: "Carrer de la Orquidea",
                numero: "1",
                cp: "08020",
                foto_restaurante: 'http://localhost:3000/api/uploads/tailandes1.jpg',
                tipos_cocina: [10]
            },
            {
                nombre: 'Bangkok Street',
                descripcio: 'Un lugar vibrante que ofrece una experiencia callejera tailandesa auténtica, con platos picantes y sabrosos que reflejan la diversidad de la cocina tailandesa.',
                correo: 'info@bangkokstreet.com',
                password: 'test123',
                telefono: "999929999",
                dieta: 0,
                direccion: "calle Amarilla",
                numero: "42",
                cp: "08036",
                foto_restaurante: 'http://localhost:3000/api/uploads/tailandes2.jpg',
                tipos_cocina: [10]
            },
            {
                nombre: 'Siam Palace',
                descripcio: 'Un palacio gastronómico que ofrece una amplia gama de platos tailandeses, desde curry hasta ensaladas y fideos, con ingredientes frescos y auténticos.',
                correo: 'info@siam-palace.com',
                password: 'test123',
                telefono: "999929999",
                dieta: 0,
                direccion: "Passeig de Fabra i Puig",
                numero: "296",
                cp: "08039",
                foto_restaurante: 'http://localhost:3000/api/uploads/tailandes3.jpg',
                tipos_cocina: [10]
            },
            {
                nombre: "Thai Spice",
                descripcio: "Un lugar íntimo que sirve platos tailandeses tradicionales con un toque moderno, utilizando especias frescas y sabores auténticos para crear una experiencia única.",
                correo: "info@thaispice.com",
                password: "test123",
                telefono: "932999999",
                dieta: 0,
                direccion: "Calle Marina",
                numero: "105",
                cp: "08001",
                foto_restaurante: "http://localhost:3000/api/uploads/tailandes4.jpg",
                tipos_cocina: [10]
            },
            {
                nombre: "Chao Phraya",
                descripcio: "Un rincón de Tailandia en tu ciudad, donde puedes disfrutar de platos clásicos tailandeses en un ambiente elegante y acogedor.",
                correo: "info@chaophraya.com",
                password: "test123",
                telefono: "932999999",
                dieta: 0,
                direccion: "Calle Mayor",
                numero: "10",
                cp: "08030",
                foto_restaurante: "http://localhost:3000/api/uploads/tailandes5.jpg",
                tipos_cocina: [10]
            },

            //11 CATALANA

            {
                nombre: "El Born",
                descripcio: "Restaurante vegetariano en el Born",
                correo: "elborn@elbooorn.com",
                password: "test123",
                telefono: "933888888",
                dieta: 0,
                direccion: "Calle Princesa",
                numero: "50",
                cp: "08003",
                foto_restaurante: "http://localhost:3000/api/uploads/catalana1.jpg",
                tipos_cocina: [11]
            },
            {
                nombre: "El Raval",
                descripcio: "Restaurante de cocina catalana",
                correo: "lala@test123.com",
                password: "test123",
                telefono: "931777777",
                dieta: 0,
                direccion: "Rambla del Raval",
                numero: "35",
                cp: "08001",
                foto_restaurante: "http://localhost:3000/api/uploads/catalana2.jpg",
                tipos_cocina: [9, 11]
            },
            {
                nombre: "Gràcia",
                descripcio: "Restaurante vegano en Gràcia",
                correo: "lele@test123.com",
                password: "test123",
                telefono: "932222111",
                dieta: 0,
                direccion: "Travessera de Gràcia",
                numero: "256",
                cp: "08024",
                foto_restaurante: "http://localhost:3000/api/uploads/catalana3.jpg",
                tipos_cocina: [9, 11]
            },
            {
                nombre: "El Gòtic",
                descripcio: "Restaurante de fusión en el Gòtic",
                correo: "oishiii@test123.com",
                password: "test123",
                telefono: "934444444",
                dieta: 0,
                direccion: "Carrer del Bisbe",
                numero: "10",
                cp: "08002",
                foto_restaurante: "http://localhost:3000/api/uploads/catalana4.jpg",
                tipos_cocina: [9, 11]
            },
            {
                nombre: "Poble Sec",
                descripcio: "Restaurante mediterráneo en Poble Sec",
                correo: "jaja@test123.com",
                password: "test123",
                telefono: "935000000",
                dieta: 0,
                direccion: "Avinguda del Paral·lel",
                numero: "14",
                cp: "08001",
                foto_restaurante: "http://localhost:3000/api/uploads/catalana5.jpg",
                tipos_cocina: [11]
            },

            //12 COLOMBIANA

            {
                nombre: "El Cielo",
                descripcio: "Un restaurante colombiano conocido por su enfoque en la cocina tradicional colombiana con un toque moderno. Ofrece platos auténticos como bandeja paisa, arepas rellenas y sancocho de gallina.",
                correo: "info@elcielo.com",
                password: "test123",
                telefono: "935111111",
                dieta: 0,
                direccion: "Carrer Carrera",
                numero: "22",
                cp: "08040",
                foto_restaurante: "http://localhost:3000/api/uploads/colombiano1.jpg",
                tipos_cocina: [12]
            },
            {
                nombre: "Andrés Carne de Res",
                descripcio: "Este restaurante es una experiencia cultural en sí mismo. Ofrece una amplia variedad de platos colombianos, desde carnes asadas hasta platos típicos como ajiaco y cazuela de mariscos. ",
                correo: "info@andres.com",
                password: "test123",
                telefono: "935111111",
                dieta: 0,
                direccion: "Carrer Chile",
                numero: "27",
                cp: "08018",
                foto_restaurante: "http://localhost:3000/api/uploads/colombiano2.jpg",
                tipos_cocina: [12]
            },
            {
                nombre: "La Puerta Falsa",
                descripcio: "Este icónico restaurante es famoso por su ajiaco, una sopa colombiana tradicional. También ofrece otras delicias colombianas como tamales, empanadas y chocolate caliente con queso. ",
                correo: "info@puertafalsa.com",
                password: "test123",
                telefono: "935111111",
                dieta: 0,
                direccion: "Carrer Correa",
                numero: "2",
                cp: "08017",
                foto_restaurante: "http://localhost:3000/api/uploads/colombiano3.jpg",
                tipos_cocina: [12]
            },


            //13 COREANA

            {
                nombre: "Gochu Jip",
                descripcio: "Auténtico restaurante coreano especializado en platos picantes y barbacoa a la parrilla en el corazón de Poble Sec.",
                correo: "gochujip@test123.com",
                password: "test123",
                telefono: "935111111",
                dieta: 0,
                direccion: "Carrer de Blai",
                numero: "20",
                cp: "08001",
                foto_restaurante: "http://localhost:3000/api/uploads/coreana1.jpg",
                tipos_cocina: [13]
            },
            
            {
                nombre: "HanGuk Sikdang",
                descripcio: "Experimenta la esencia de Corea del Sur en nuestro restaurante HanGuk Sikdang, donde fusionamos autenticidad y creatividad culinaria.",
                correo: "hanguksikdang@test123.com",
                password: "test123",
                telefono: "935222222",
                dieta: 0,
                direccion: "Carrer de Margarit",
                numero: "40",
                cp: "08003",
                foto_restaurante: "http://localhost:3000/api/uploads/coreana2.jpg",
                tipos_cocina: [13]
            },
            {
                nombre: "Bibim Bab House",
                descripcio: "Sumérgete en una experiencia gastronómica única con nuestra variedad de bibimbap y platos tradicionales en Bibim Bab House.",
                correo: "bibimbabhouse@test123.com",
                password: "test123",
                telefono: "935333333",
                dieta: 0,
                direccion: "Carrer de Tapioles",
                numero: "10",
                cp: "08002",
                foto_restaurante: "http://localhost:3000/api/uploads/coreana3.jpg",
                tipos_cocina: [13]
            },


            //14 PERUANA


            {
                nombre: "La Cevichería Criolla",
                descripcio: "Descubre los sabores auténticos del Perú en La Cevichería Criolla, donde cada plato es una explosión de frescura y tradición.",
                correo: "cevicheriacriolla@test123.com",
                password: "test123",
                telefono: "935444444",
                dieta: 0,
                direccion: "Carrer de Blai",
                numero: "30",
                cp: "08004",
                foto_restaurante: "http://localhost:3000/api/uploads/peruano1.jpg",
                tipos_cocina: [14]
            },
            
            {
                nombre: "El Sabor del Perú",
                descripcio: "Viaja a través de los sabores del Perú en El Sabor del Perú, donde cada plato cuenta una historia de tradición y pasión culinaria.",
                correo: "elsabordelperu@test123.com",
                password: "test123",
                telefono: "935555555",
                dieta: 0,
                direccion: "Carrer de Margarit",
                numero: "50",
                cp: "08001",
                foto_restaurante: "http://localhost:3000/api/uploads/peruano2.jpg",
                tipos_cocina: [14]
            },
            
            {
                nombre: "Pachamama Restaurante",
                descripcio: "Embárcate en un viaje gastronómico a través de la diversidad culinaria del Perú en Pachamama Restaurante, donde cada plato es una celebración de la tierra.",
                correo: "pachamamarestaurante@test123.com",
                password: "test123",
                telefono: "935666666",
                dieta: 0,
                direccion: "Carrer de Tapioles",
                numero: "20",
                cp: "08002",
                foto_restaurante: "http://localhost:3000/api/uploads/peruano3.jpg",
                tipos_cocina: [14]
            },


            //15 HAWAIANO


            {
                nombre: "Hale Hau'oli",
                descripcio: "Sumérgete en la alegría de Hawai en Hale Hau'oli, donde cada plato es una fiesta de sabores tropicales y exóticos.",
                correo: "halehauoli@test123.com",
                password: "test123",
                telefono: "935777777",
                dieta: 0,
                direccion: "Carrer de Blai",
                numero: "40",
                cp: "08002",
                foto_restaurante: "http://localhost:3000/api/uploads/hawaiano1.jpg",
                tipos_cocina: [15]
            },
            {
                nombre: "Ohana Luau",
                descripcio: "Únete a la familia en Ohana Luau, donde la comida hawaiana auténtica y el espíritu de aloha se fusionan en una experiencia inolvidable.",
                correo: "ohanaluau@test123.com",
                password: "test123",
                telefono: "935888888",
                dieta: 0,
                direccion: "Carrer de Margarit",
                numero: "60",
                cp: "08001",
                foto_restaurante: "http://localhost:3000/api/uploads/hawaiano2.jpg",
                tipos_cocina: [15]
            },
            {
                nombre: "Pono Poké Bar",
                descripcio: "Siente la frescura del Pacífico en cada bocado en Pono Poké Bar, donde los bowls de poké y los sabores hawaianos te transportarán a la playa.",
                correo: "ponopokebar@test123.com",
                password: "test123",
                telefono: "935999999",
                dieta: 0,
                direccion: "Carrer de Tapioles",
                numero: "30",
                cp: "08003  ",
                foto_restaurante: "http://localhost:3000/api/uploads/hawaiano3.jpg",
                tipos_cocina: [15]
            }
        ]

        for (const rest of restObj) {
            const restaurante = await Restaurante.create(rest);
            await restaurante.addTipoCocina(rest.tipos_cocina)
        }

        console.log('Datos creados exitosamente.');
    } catch (error) {
        console.error('Error al crear datos:', error);
    }
}

module.exports = anadirRestaurante