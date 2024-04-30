const { Restaurante } = require("../models");

async function anadirRestaurante() {
    /* 
     PARA AÑADIR FOTO RESTAURANTE

     1r paso añadir imagen en la carpeta upload (nombre unico)
     2n en foto_restaurante añadir el siguiente texto http://localhost:3000/api/uploads/ + <nombre foto añadida en uopload>
     (AÑADIR EXTENSION IMAGEN EJEMPLO .jpg)

    1 Americana
    2 China
    3 Griega
    4 India
    5 Italiana
    6 Japonesa
    7 Mexicana
    8 Marroqui
    9 Española
    10 Thailandesa
    11 Catalana
     */
    
    try {
        const restObj = [
            //ESPAÑOL
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
                foto_restaurante: 'restaurante1.jpg',
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
                foto_restaurante: 'restaurante2.jpg',
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
                foto_restaurante: 'restaurante1.jpg',
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
                foto_restaurante: "restaurante3.jpg",
                tipos_cocina: [2, 6]
            },

            //CATALANA
            {
                nombre: "El Born",
                descripcio: "Restaurante vegetariano en el Born",
                correo: "elborn@test123.com",
                password: "test123",
                telefono: "933888888",
                dieta: 0,
                direccion: "Calle Princesa",
                numero: "50",
                cp: "08003",
                foto_restaurante: "restaurante1.jpg",
                tipos_cocina: [9, 11]
            },
            {
                nombre: "El Raval",
                descripcio: "Restaurante de cocina catalana",
                correo: "elraval@test123.com",
                password: "test123",
                telefono: "931777777",
                dieta: 0,
                direccion: "Rambla del Raval",
                numero: "35",
                cp: "08001",
                foto_restaurante: "restaurante2.jpg",
                tipos_cocina: [9, 11]
            },
            {
                nombre: "Gràcia",
                descripcio: "Restaurante vegano en Gràcia",
                correo: "gracia@test123.com",
                password: "test123",
                telefono: "932222111",
                dieta: 0,
                direccion: "Travessera de Gràcia",
                numero: "256",
                cp: "08024",
                foto_restaurante: "restaurante3.jpg",
                tipos_cocina: [9, 11]
            },
            {
                nombre: "El Gòtic",
                descripcio: "Restaurante de fusión en el Gòtic",
                correo: "elgotic@test123.com",
                password: "test123",
                telefono: "934444444",
                dieta: 0,
                direccion: "Carrer del Bisbe",
                numero: "10",
                cp: "08002",
                foto_restaurante: "restaurante1.jpg",
                tipos_cocina: [9, 11]
            },
            {
                nombre: "Poble Sec",
                descripcio: "Restaurante mediterráneo en Poble Sec",
                correo: "poblesec@test123.com",
                password: "test123",
                telefono: "935000000",
                dieta: 0,
                direccion: "Avinguda del Paral·lel",
                numero: "14",
                cp: "08001",
                foto_restaurante: "restaurante2.jpg",
                tipos_cocina: [9, 11]
            },

            //XINA
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
                foto_restaurante: 'restaurante2.jpg',
                tipos_cocina: [2, 6]
            },

            //MEXICANO
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
                foto_restaurante: "restaurante3.jpg",
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
                foto_restaurante: "restaurante1.jpg",
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
                foto_restaurante: "restaurante2.jpg",
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
                foto_restaurante: "restaurante3.jpg",
                tipos_cocina: [2, 6]
            },

            //ITALIANA
            {
                nombre: "Luccio",
                descripcio: "Restaurante de cocina tradicional italiana",
                correo: "info@luccio.com",
                password: "test123",
                telefono: "911111111",
                dieta: 0,
                direccion: "Calle Cava Baja 35",
                numero: "35",
                cp: "08005",
                foto_restaurante: "restaurante1.jpg",
                tipos_cocina: [5]
            },
            {
                nombre: "Pizzana",
                descripcio: "Mejores pizzas de toda Barcelona, aqui",
                correo: "info@pizzana.com",
                password: "test123",
                telefono: "922222222",
                dieta: 0,
                direccion: "Calle Cuchilleros 17",
                numero: "17",
                cp: "08005",
                foto_restaurante: "restaurante2.jpg",
                tipos_cocina: [5]
            },
            {
                nombre: "Pastacuore",
                descripcio: "La pasta de verdad aqui",
                correo: "info@pastacuore.com",
                password: "test123",
                telefono: "933333333",
                dieta: 0,
                direccion: "Calle Cuchilleros 17",
                numero: "17",
                cp: "08005",
                foto_restaurante: "restaurante3.jpg",
                tipos_cocina: [8, 9]
            },

            // INDIO

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
                foto_restaurante: "restaurante2.jpg",
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
                foto_restaurante: "restaurante2.jpg",
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
                foto_restaurante: "restaurante2.jpg",
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
                foto_restaurante: "restaurante2.jpg",
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
                foto_restaurante: "restaurante2.jpg",
                tipos_cocina: [4]
            },

            // GRIEGO

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
                foto_restaurante: "restaurante2.jpg",
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
                foto_restaurante: "restaurante2.jpg",
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
                foto_restaurante: "restaurante2.jpg",
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
                foto_restaurante: "restaurante2.jpg",
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
                foto_restaurante: "restaurante2.jpg",
                tipos_cocina: [3]
            },

            // MARROQUI

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
                foto_restaurante: "restaurante2.jpg",
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
                foto_restaurante: "restaurante2.jpg",
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
                foto_restaurante: "restaurante2.jpg",
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
                foto_restaurante: "restaurante2.jpg",
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
                foto_restaurante: "restaurante2.jpg",
                tipos_cocina: [8]
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
