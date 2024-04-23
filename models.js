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

const sequelize = new Sequelize("gamba", "root", "", {
    host: "localhost",
    //host: '192.168.1.133', //IP de la base de dades
    port: 3306,
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
        type: DataTypes.STRING,// o INT si es CP????
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,// o INT si es CP????
        allowNull: false,
    },
    cp: {
        type: DataTypes.STRING,// o INT si es CP????
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
    foto_restaurante: {
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
}

//iniDB();


(async () => {
    try {
        // Crear algunos ingredientes
        const ingrediente1 = await Ingrediente.create({ nombre_ingrediente: 'Harina' });
        const ingrediente2 = await Ingrediente.create({ nombre_ingrediente: 'Azúcar' });
        const ingrediente3 = await Ingrediente.create({ nombre_ingrediente: 'Huevos' });

        // Crear algunos grupos de alimentos
        const grupo1 = await GrupoAlimento.create({ nombre_grupo: 'Frutas', dieta: 'Vegana' });
        const grupo2 = await GrupoAlimento.create({ nombre_grupo: 'Carnes', dieta: 'Omnívora' });

        // Crear algunos tipos de cocina
        const tipo1 = await TipoCocina.create({ nombre_tipo: 'Mediterránea' });
        const tipo2 = await TipoCocina.create({ nombre_tipo: 'Asiática' });

        // Crear una receta
        const receta1 = await Receta.create({
            nombre_receta: 'Tarta de manzana',
            desc_receta: 'Una deliciosa tarta de manzana casera',
            persones: '4',
            tiempo: '1 hora',
            dificultad: 'Media',
            tipo: 'postre',
            foto_receta: 'tarta_manzana.jpg'
        });

        // Asociar ingredientes a la receta
        await Receta_Ingrediente.create({ RecetumId: receta1.id, IngredienteId: ingrediente1.id, cantidad: 250, medida: 'gramos' });
        await Receta_Ingrediente.create({ RecetumId: receta1.id, IngredienteId: ingrediente2.id, cantidad: 150, medida: 'gramos' });
        await Receta_Ingrediente.create({ RecetumId: receta1.id, IngredienteId: ingrediente3.id, cantidad: 3, medida: 'unidades' });

        // Crear un procedimiento para la receta
        const procedimiento1 = await Procedimiento.create({
            numero_procedimiento: '1',
            desc_procedimiento: 'Mezclar la harina y el azúcar en un bol grande',
            foto_procedimiento: 'mezclar.jpg'
        });

        // Asociar el procedimiento a la receta
        await receta1.addProcedimiento(procedimiento1);

        console.log('Datos creados exitosamente.');
    } catch (error) {
        console.error('Error al crear datos:', error);
    } finally {
        // Cierra la conexión a la base de datos
        await sequelize.close();
    }
})();

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
