// npm install bcrypt mysql2 sequelize cors express cookie-parser jsonwebtoken multer


// Es defineix la configuració de sequelize
const { Sequelize, DataTypes } = require("sequelize"); // Importa la llibreria Sequelize
const coci = [[
    "Americana",
    "Britanica",
    "China",
    "Croata",
    "Alemana",
    "Egicia",
    "Filipina",
    "Francesa",
    "Griega",
    "India",
    "Italiana",
    "Jamaicana",
    "Japonesa",
    "Malaysiana",
    "Mexicana",
    "Marroqui",
    "Portuguesa",
    "Rusa",
    "Española",
    "Thailandesa",
    "Indonesia",
    "Otros"
]
]
const bcrypt = require("bcrypt"); // Importa la llibreria bcrypt per a encriptar contrasenyes

const sequelize = new Sequelize("gamba", "root", "admin", {
    host: "localhost",
    //host: '192.168.1.133', //IP de la base de dades
    port: 3308,
    dialect: "mysql", // connectem a mysql
});

// Model per a la taula Projectes
const Usuario = sequelize.define("Usuario", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cp: {
        type: DataTypes.STRING,// o INT si es CP????
        allowNull: false,
    },
    dieta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto_perfil: {
        type: DataTypes.STRING, // Tipo de datos para almacenar la URL de la imagen
        allowNull: true, // Permitir que el campo sea nulo
    },
});

// Model per a la taula Issues
const Restaurante = sequelize.define("Restaurante", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dieta: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto_restaurnte: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});


// Model per a la taula Receta
const Receta = sequelize.define("Receta", {
    nombre_receta: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    desc_receta: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    persones: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tiempo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dificultad: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tipo: {
        type: DataTypes.ENUM('postre', 'primero', 'segundo', 'entrante', ''),
        allowNull: true,
    },
    foto_receta: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Model per a la taula Receta
const Ingrediente = sequelize.define("Ingrediente", {
    nombre_ingrediente: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Model per a la taula Receta
const GrupoAlimento = sequelize.define("GrupoAlimento", {
    nombre_grupo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dieta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Model per a la taula Receta
const Promo = sequelize.define("Promo", {
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    validada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

// Model per a la taula Receta
const TipoCocina = sequelize.define("TipoCocina", {
    nombre_tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Model per a la taula Receta
const Procedimiento = sequelize.define("Procedimiento", {
    numero_procedimiento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc_procedimiento: {
        type: DataTypes.STRING,
        unique: false,
    },
    foto_procedimiento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Model per a la taula Receta
const Receta_Ingrediente = sequelize.define("Receta_Ingrediente", {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medida: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// hook per encriptar la contrasenya abans de desar un nou usuari o restaurant
Usuario.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Encripta la contrasenya amb bcrypt
    user.password = hashedPassword;
});

Restaurante.beforeCreate(async (restaurant) => {
    const hashedPassword = await bcrypt.hash(restaurant.password, 10); // Encripta la contrasenya amb bcrypt
    restaurant.password = hashedPassword;
});



// Definim les relacions

// Project.hasMany(Issue, { onDelete: 'CASCADE', hooks: true });  DE REFERNCIA PER SI ESTE QUE BORRAR ALGO EN CASCADA

Usuario.belongsToMany(Restaurante, { through: 'UsuarioRestaurante' }); // Un usuario puede seguir a muchos restaurantes
Restaurante.belongsToMany(Usuario, { through: 'UsuarioRestaurante' }); // Un restaurante puede seguir a muchos restaurantes

Receta.belongsToMany(Ingrediente, { through: Receta_Ingrediente }); // Una receta puede tener varios ingredientes
Ingrediente.belongsToMany(Receta, { through: Receta_Ingrediente }); // Un ingrediente puede ser usado por varias recetas

Receta.belongsToMany(Usuario, { through: 'RecetaUsuario' });
Usuario.belongsToMany(Receta, { through: 'RecetaUsuario' });

Restaurante.hasMany(Receta)// Un restaurante puede tener muchas recetas
Receta.belongsTo(Restaurante) // Un receta pertences a un solo restaurante

Usuario.belongsToMany(TipoCocina, { through: 'UsuarioCocina' }); // Un usuario puede tener varios tipos cocina
TipoCocina.belongsToMany(Usuario, { through: 'UsuarioCocina' }); // Un tipo de cocina lo pueden tener varios usuarios

Receta.belongsTo(TipoCocina); // Una receta tiene un unico tipo de cocina
TipoCocina.hasMany(Receta); // Un tipo de cocina pertence a varias recetas

Restaurante.belongsToMany(TipoCocina, { through: 'RestauranteCocina' })
TipoCocina.belongsToMany(Restaurante, { through: 'RestauranteCocina' })

Ingrediente.belongsTo(GrupoAlimento); // Un ingrediente tiene un unico grupo
GrupoAlimento.hasMany(Ingrediente); // Un grupo pertence a varios ingredientes

Promo.belongsTo(Usuario); // Una promo tiene un unico usuario
Usuario.hasMany(Promo); // Un usuario puede tener varias promos

Promo.belongsTo(Restaurante); // Una promo tiene un unico restaurante
Restaurante.hasMany(Promo); // Un restaurante puede tener varias promos

Procedimiento.belongsTo(Receta); // Un procedimineto tiene una unica receta
Receta.hasMany(Procedimiento); // Un receta puede tener varios procedimiento

GrupoAlimento.belongsToMany(Usuario, { through: 'UsuarioAlimento' }) // Un grupo de alimento puede estar en muchos usuarios
Usuario.belongsToMany(GrupoAlimento, { through: 'UsuarioAlimento' }) // Un usuario puede tener muchos grupos de alimentos

// connectem a base de dades
async function iniDB() {
    await sequelize.sync({ force: true });

    const cocinas = require("./data/tipococina.json");
    const cocinas_añadidas = TipoCocina.bulkCreate(cocinas);

    const grupos = require("./data/grupos_alimentos.json");
    const grupos_añadidos = GrupoAlimento.bulkCreate(grupos);

    const ingredientes = require("./data/ingredientes.json");
    const ingredientes_añadidos = Ingrediente.bulkCreate(ingredientes);

    /*     await añadirRestaurante()
     */
    (async () => {
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
                tipos_cocina: [1,9]
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
                tipos_cocina: [7,9]
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
                tipos_cocina: [8,9]
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
    })()
}



iniDB();



//Exportem els models
module.exports = {
    Receta,
    Usuario,
    Restaurante,
    Receta_Ingrediente,
    Ingrediente,
    Promo,
    Procedimiento,
    GrupoAlimento,
    TipoCocina,
    sequelize, // Per si vols utilitzar la instància de Sequelize per a altres operacions
};
