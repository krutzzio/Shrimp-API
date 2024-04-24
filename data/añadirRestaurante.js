

const { Restaurante, TipoCocina } = require('../models'); // Importa los modelos definidos en tu archivo

const añadirRestaurante = async () => {
    try {
        const ingredientes = [2, 19, 22]
        const restObj = {
            nombre: 'Restaurante Nombre bonito',
            descripcio: 'Mejor restaurante del barrio',
            correo: 'correo@test.com',
            password: 'test123',
            telefono: "999999999",
            dieta: 0,
            direccion: "calle test",
            numero: "42",
            cp: "12345",
            foto_restaurnte: 'restaurante1.jpg'
        }

        const tiposCocinaRest = [1, 2]

        const restaurante = await Restaurante.create(restObj);

        await restaurante.addTipoCocina(tiposCocinaRest)

        console.log('Datos creados exitosamente.');
    } catch (error) {
        console.error('Error al crear datos:', error);
    }
}

module.exports = { añadirRestaurante }
