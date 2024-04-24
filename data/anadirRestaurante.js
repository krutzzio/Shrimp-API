const { Restaurante } = require("../models");

async function anadirRestaurante() {
    try {
        const restObj = [{
            nombre: 'Restaurante Nombre bonito',
            descripcio: 'Mejor restaurante del barrio',
            correo: 'correo@test.com',
            password: 'test123',
            telefono: "999999999",
            dieta: 0,
            direccion: "calle test",
            numero: "42",
            cp: "12345",
            foto_restaurnte: 'restaurante1.jpg',
            tipos_cocina: [1, 2]
        },
        {
            nombre: 'Restaurante DonKamaron',
            descripcio: 'Mejor restaurante de buenos camarón',
            correo: 'donkamaron@test123.com',
            password: 'test123',
            telefono: "999929999",
            dieta: 0,
            direccion: "calle test",
            numero: "42",
            cp: "12345",
            foto_restaurnte: 'restaurante2.jpg',
            tipos_cocina: [9, 7]
        },
        {
            nombre: 'Restaurante de la esquina',
            descripcio: 'Mejor restaurante de la esquina',
            correo: 'esquina1@test123.com',
            password: 'test123',
            telefono: "999929999",
            dieta: 0,
            direccion: "calle test",
            numero: "42",
            cp: "12345",
            foto_restaurnte: 'restaurante3.jpg',
            tipos_cocina: [2, 6]
        },
        {
            nombre: 'Restaurante La esquinica',
            descripcio: 'Restaurante de la esquinica con las mejores bravas.',
            correo: 'esquinica@test123.com',
            password: 'test123',
            telefono: "999929999",
            dieta: 0,
            direccion: "calle fabra",
            numero: "42",
            cp: "12345",
            foto_restaurnte: 'restaurante1.jpg',
            tipos_cocina: [9, 3]
        },
        {
            nombre: 'Restaurante Xinatown',
            descripcio: 'Restaurante con las mejores comida china',
            correo: 'xinatown@test123.com',
            password: 'test123',
            telefono: "999929999",
            dieta: 0,
            direccion: "calle chinatown",
            numero: "42",
            cp: "12345",
            foto_restaurnte: 'restaurante2.jpg',
            tipos_cocina: [2, 6]
        },
        {
            nombre: "Restaurante La Barceloneta",
            descripcio: "Restaurante de cocina mediterránea",
            correo: "labarceloneta@test123.com",
            password: "test123",
            telefono: "932999999",
            dieta: 0,
            direccion: "Calle Marina",
            numero: "105",
            cp: "08001",
            foto_restaurnte: "restaurante3.jpg",
            tipos_cocina: [2, 6]
        },
        {
            nombre: "Restaurante El Born",
            descripcio: "Restaurante vegetariano en el Born",
            correo: "elborn@test123.com",
            password: "test123",
            telefono: "933888888",
            dieta: 0,
            direccion: "Calle Princesa",
            numero: "50",
            cp: "08003",
            foto_restaurnte: "restaurante1.jpg",
            tipos_cocina: [3, 8]
        },
        {
            nombre: "Restaurante El Raval",
            descripcio: "Restaurante de cocina catalana",
            correo: "elraval@test123.com",
            password: "test123",
            telefono: "931777777",
            dieta: 0,
            direccion: "Rambla del Raval",
            numero: "35",
            cp: "08001",
            foto_restaurnte: "restaurante2.jpg",
            tipos_cocina: [1, 4]
        },
        {
            nombre: "Restaurante Gràcia",
            descripcio: "Restaurante vegano en Gràcia",
            correo: "gracia@test123.com",
            password: "test123",
            telefono: "932222111",
            dieta: 0,
            direccion: "Travessera de Gràcia",
            numero: "256",
            cp: "08024",
            foto_restaurnte: "restaurante3.jpg",
            tipos_cocina: [5, 7]
        },
        {
            nombre: "Restaurante El Gòtic",
            descripcio: "Restaurante de fusión en el Gòtic",
            correo: "elgotic@test123.com",
            password: "test123",
            telefono: "934444444",
            dieta: 0,
            direccion: "Carrer del Bisbe",
            numero: "10",
            cp: "08002",
            foto_restaurnte: "restaurante1.jpg",
            tipos_cocina: [3, 6]
        },
        {
            nombre: "Restaurante Poble Sec",
            descripcio: "Restaurante mediterráneo en Poble Sec",
            correo: "poblesec@test123.com",
            password: "test123",
            telefono: "935000000",
            dieta: 0,
            direccion: "Avinguda del Paral·lel",
            numero: "14",
            cp: "08001",
            foto_restaurnte: "restaurante2.jpg",
            tipos_cocina: [2, 4]
        },
        {
            nombre: "Restaurante Poblenou",
            descripcio: "Restaurante de cocina creativa",
            correo: "poblenou@test123.com",
            password: "test123",
            telefono: "936111111",
            dieta: 0,
            direccion: "Rambla del Poblenou",
            numero: "98",
            cp: "08018",
            foto_restaurnte: "restaurante3.jpg",
            tipos_cocina: [6, 8]
        },
        {
            nombre: "Restaurante Sants",
            descripcio: "Restaurante vegetariano en Sants",
            correo: "sants@test123.com",
            password: "test123",
            telefono: "937777777",
            dieta: 0,
            direccion: "Carrer de Sants",
            numero: "79",
            cp: "08014",
            foto_restaurnte: "restaurante1.jpg",
            tipos_cocina: [3, 7]
        },
        {
            nombre: "Restaurante Eixample",
            descripcio: "Restaurante de cocina internacional",
            correo: "eixample@test123.com",
            password: "test123",
            telefono: "938888888",
            dieta: 0,
            direccion: "Passeig de Gràcia",
            numero: "45",
            cp: "08007",
            foto_restaurnte: "restaurante2.jpg",
            tipos_cocina: [1, 5]
        },
        {
            nombre: "Restaurante Les Corts",
            descripcio: "Restaurante de cocina mediterránea",
            correo: "lescorts@test123.com",
            password: "test123",
            telefono: "939999999",
            dieta: 0,
            direccion: "Travessera de Les Corts",
            numero: "322",
            cp: "08028",
            foto_restaurnte: "restaurante3.jpg",
            tipos_cocina: [2, 6]
        },
        {
            nombre: "Restaurante Casa Lucio",
            descripcio: "Restaurante de cocina tradicional madrileña",
            correo: "casalucio@test123.com",
            password: "test123",
            telefono: "911111111",
            dieta: 0,
            direccion: "Calle Cava Baja 35",
            numero: "35",
            cp: "28005",
            foto_restaurnte: "restaurante1.jpg",
            tipos_cocina: [1, 9]
        },
        {
            nombre: "Restaurante El Botín",
            descripcio: "El restaurante más antiguo del mundo",
            correo: "elbotin@test123.com",
            password: "test123",
            telefono: "922222222",
            dieta: 0,
            direccion: "Calle Cuchilleros 17",
            numero: "17",
            cp: "28005",
            foto_restaurnte: "restaurante2.jpg",
            tipos_cocina: [7, 9]
        },
        {
            nombre: "Restaurante Sobrino de Botín",
            descripcio: "Restaurante típico madrileño especializado en cocido",
            correo: "sobrinobotin@test123.com",
            password: "test123",
            telefono: "933333333",
            dieta: 0,
            direccion: "Calle Cuchilleros 17",
            numero: "17",
            cp: "28005",
            foto_restaurnte: "restaurante3.jpg",
            tipos_cocina: [8, 9]
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
