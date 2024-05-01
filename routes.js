const express = require("express"); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const bcrypt = require("bcrypt"); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require("jsonwebtoken"); // Importa la llibreria jsonwebtoken per a generar i verificar JWT
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");


const SECRET_KEY = "vols-que-et-punxi-amb-un-punxo";

const {
  // Usuario_Restaraunte,
  Usuario,
  Restaurante,
  Receta,
  TipoCocina,
  Ingrediente,
  Receta_Ingrediente,
  GrupoAlimento,
  Promo
} = require("./models"); // Importa els models de dades

const {
  updateRestItem,
  createItem,
  updateItem,
  deleteItem,
  readItem,
  readItems,
  readItemForUser,
  readItemsForUser,
  deleteItemForUser,
} = require("./generics"); // Importa les funcions per a realitzar operacions CRUD genèriques
const { where } = require("sequelize");

// CONFIG MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // La carpeta de destino donde se almacenarán los archivos subidos
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); // Nombre del archivo almacenado
  },
});

const upload = multer({ storage: storage });

// Endpoint para manejar la subida de archivos
router.post("/uploadFile", upload.single("photo"), (req, res) => {
  res.send("Archivo subido con éxito");
});

// Middleware per verificar el JWT en la cookie

const checkToken = (req, res, next) => {
  const token = req.cookies?.token; // Obté el token des de la cookie de la petició
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" }); // Retorna error 401 si no hi ha cap token
  }
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY); // Verifica el token utilitzant la clau secreta
    req.userId = decodedToken.userId; // Estableix l'ID d'usuari a l'objecte de la petició
    next(); // Passa al següent middleware
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" }); // Retorna error 401 si el token és invàlid
  }
};

router.get("/api/refresh", checkToken, async (req, res) => {
  const users = readUsers();

  const user = users.find((user) => user.id === userId);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "User not found" });
  }

  return res.json({ id: user.id, name: user.name });
});

/* -------------------------------------------------------------------------- */
/*                                    USER                                   */
/* -------------------------------------------------------------------------- */

// Operacions CRUD per als Usuaris
router.get("/users", checkToken, async (req, res) => await readItems(req, res, Usuario)); // Llegeix tots els usuaris

router.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Usuario.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Comprueba si el usuario tiene una imagen de perfil
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/profileUser", checkToken, async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let restUser = await user.getRestaurantes();
    let recetasUser = await user.getReceta()

    restUser = await Promise.all(restUser.map(async restaurante => {
      const tipoCocinaRestaurante = await restaurante.getTipoCocinas()
      const restInUser = await user.hasRestaurante(restaurante);
      return {
        restaurante: restaurante.dataValues,
        tipoCocinaRestaurante: tipoCocinaRestaurante,
        restInUser: restInUser
      }
    }))

    recetasUser = await Promise.all(recetasUser.map(async receta => {
      const tipoCocinaReceta = await receta.getTipoCocina()
      const nombreRestaurante = await receta.getRestaurante()
      const recetaInUser = await user.hasReceta(receta);
      return {
        receta: receta.dataValues,
        nombreRestaurante: nombreRestaurante.nombre,
        tipoCocinaReceta: tipoCocinaReceta.nombre_tipo,
        recetaInUser: recetaInUser
      }
    }))

    res.status(200).json({ restUser, recetasUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/users/:id", checkToken, async (req, res) => await updateItem(req, res, Usuario)); // Actualitza un usuari
router.delete("/users/:id", checkToken, async (req, res) => await deleteItem(req, res, Usuario)); // Elimina un usuari

/* --------------------------------  LOGIN -------------------------------- */
// Endpoint per iniciar sessió d'un usuari
router.post("/loginUser", async (req, res) => {
  const { correo, password } = req.body; // Obté l'correo i la contrasenya de la petició
  try {
    const user = await Usuario.findOne({ where: { correo } }); // Cerca l'usuari pel seu email
    if (!user) {
      return res.status(404).json({ error: "User no trobat" }); // Retorna error 404 si l'usuari no es troba
    }
    const passwordMatch = await bcrypt.compare(password, user.password); // Compara la contrasenya proporcionada amb la contrasenya encriptada de l'usuari
    if (!passwordMatch) {
      return res.status(401).json({ error: "Password incorrecte" }); // Retorna error 401 si la contrasenya és incorrecta
    }
    const token = jwt.sign(
      { userId: user.id, nombre: user.nombre },
      SECRET_KEY,
      { expiresIn: "2h" }
    ); // Genera un token JWT vàlid durant 2 hores
    res.cookie("token", token, { httpOnly: false, maxAge: 7200000 }); // Estableix el token com una cookie
    res.json({ nombre: user.nombre, id: user.id }); // Retorna missatge d'èxit
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
  }
});

/* -------------------------------  REGISTER ------------------------------ */
// Endpoint per registrar un usuari
router.post("/registerUser", upload.single("photo"), async (req, res) => {
  try {
    const {
      nombre,
      correo,
      password,
      cp,
      tipos_cocina,
      alergias,
      dieta,
    } = req.body; // Obté el nom, email i contrasenya de la petició

    const baseUrl = 'http://localhost:3000/api/uploads/'
    const foto_perfil = req.file ? baseUrl + req.file.filename : null; // Obtiene la ruta del archivo subido

    if (!nombre || !correo || !password || !cp) {
      return res
        .status(400)
        .json({
          error:
            "Nombre, apellido, email, password y localización son requeridos",
        }); // Retorna error 400 si no es proporcionen el nom, email o contrasenya
    }

    const alergiasArray = alergias.split(",")
    const alimentosAlergia = await GrupoAlimento.findAll({ where: { nombre_grupo: alergiasArray } })
    const alergiasId = alimentosAlergia.map(alergia => alergia.id)

    const cocinas = tipos_cocina.split(",")
    const tiposCocinas = await TipoCocina.findAll({ where: { nombre_tipo: cocinas } })
    const cocinasId = tiposCocinas.map(cocina => cocina.id)


    const existingUser = await Usuario.findOne({ where: { correo } });
    // Comprova si l'email ja està registrat
    if (existingUser) {
      return res.status(400).json({ error: "Email ja existeix" }); // Retorna error 400 si l'email ja està registrat
    }

    const user = await Usuario.create({
      nombre,
      correo,
      password,
      cp,
      dieta,
      foto_perfil,
    }); // Crea l'usuari amb les dades proporcionades

    await user.addTipoCocina(cocinasId)
    await user.addGrupoAlimento(alergiasId)


    res.status(201).json({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      cp: user.cp,
      foto_perfil: foto_perfil,
    }); // Retorna l'usuari creat amb el codi d'estat 201 (Creat)


  } catch (error) {
    res.status(500).json({ error: error.message });
    throw (error) // Retorna error 500 amb el missatge d'error
  }
});





/* -------------------------------------------------------------------------- */
/*                                RESTAURANTE                               */
/* -------------------------------------------------------------------------- */

router.get("/restaurant", checkToken, async (req, res) => await readItems(req, res, Restaurante)); // Llegeix tots els restaurants
router.get("/restaurant/:id", checkToken, async (req, res) => await readItem(req, res, Restaurante)); // Llegeix un restaurant específic
router.put("/restaurant/:id", checkToken, async (req, res) => await updateItem(req, res, Restaurante)); // Actualitza un restaurant
router.delete("/restaurant/:id", checkToken, async (req, res) => await deleteItem(req, res, Restaurante)); // Elimina un restaurant

router.get("/home/restaurantes", checkToken, async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.userId);
    const tipos_cocinas_user = await user.getTipoCocinas();
    const TiposCocinaId = tipos_cocinas_user.map(tipo => tipo.id)

    //Obtener restaurantes Recomendadaos
    let restaurantesSugeridos
    if (user.dieta === 0) {
      restaurantesSugeridos = await Restaurante.findAll({
        include: [{
          model: TipoCocina,
          where: { id: TiposCocinaId } // Filtra los tipos de cocina por los IDs en el array
        }]
      })
    } else if (user.dieta === 1) {
      restaurantesSugeridos = await Restaurante.findAll({
        include: [{
          model: TipoCocina,
          where: { id: TiposCocinaId } // Filtra los tipos de cocina por los IDs en el array
        }], where: { dieta: [1, 2] }
      })
    } else {
      restaurantesSugeridos = await Restaurante.findAll({
        include: [{
          model: TipoCocina,
          where: { id: TiposCocinaId } // Filtra los tipos de cocina por los IDs en el array
        }], where: { dieta: 2 }
      })
    }

    let restaurantesRecomendados = await Promise.all(restaurantesSugeridos.map(async restaurante => {
      const tipoCocinaRestaurante = await restaurante.getTipoCocinas()
      const restInUser = await user.hasRestaurante(restaurante);
      return {
        restaurante: restaurante.dataValues,
        tipoCocinaRestaurante: tipoCocinaRestaurante,
        restInUser: restInUser
      }
    }))

    //Obtener restaurantes Recomendados
    let restaurantesCercanos = await Restaurante.findAll({ where: { cp: user.cp } })
    restaurantesCercanos = await Promise.all(restaurantesCercanos.map(async restaurante => {
      const tipoCocinaRestaurante = await restaurante.getTipoCocinas()
      const restInUser = await user.hasRestaurante(restaurante);
      return {
        restaurante: restaurante.dataValues,
        tipoCocinaRestaurante: tipoCocinaRestaurante,
        restInUser: restInUser
      }
    }))

    //Obtener recetas diferentes
    /*     const allRestaurantes = Restaurante.findAll()
        let restaurantesNuevos = await allRestaurantes.filter(rest => !TipoCocinaId.includes(rest.TipoCocinaId))
        restaurantesNuevos = await Promise.all(restaurantesNuevos.map(async restaurante => {
          const tipoCocinaReceta = await receta.getTipoCocina()
          const nombreRestaurante = await receta.getRestaurante()
          const recetaInUser = await user.hasReceta(receta);
          return {
            receta: receta.dataValues,
            nombreRestaurante: nombreRestaurante.nombre,
            tipoCocinaReceta: tipoCocinaReceta.nombre_tipo,
            recetaInUser: recetaInUser
          }
        })) */


    res.status(201).json({ restaurantesRecomendados, restaurantesCercanos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ------------------------------- REGISTER ------------------------------- */
router.post("/registerRest", upload.single("photo"), async (req, res) => {
  try {
    const {
      nombre,
      correo,
      password,
      numero,
      direccion,
      cp,
      telefono,
      descripcio,
      tipos_cocina,
      dieta
    } = req.body;
    console.log(req.body)
    const baseUrl = 'http://localhost:3000/api/uploads/'
    const foto_restaurante = req.file ? baseUrl + req.file.filename : null; // Obtiene la ruta del archivo subido

    if (
      !nombre ||
      !cp ||
      !correo ||
      !password ||
      !tipos_cocina ||
      tipos_cocina.length === 0
    ) {
      return res
        .status(400)
        .json({
          error:
            "Nombre, cp, email, password, localización y al menos un tipo de cocina son requeridos",
        });
    }

    const existingRest = await Restaurante.findOne({
      where: { correo },
    });
    if (existingRest) {
      return res.status(400).json({ error: "Email ya existe" });
    }

    const cocinas = tipos_cocina.split(",")
    const tiposCocinas = await TipoCocina.findAll({ where: { nombre_tipo: cocinas } })
    const cocinasId = tiposCocinas.map(cocina => cocina.id)


    const restaurant = await Restaurante.create({
      nombre,
      telefono,
      correo,
      password,
      descripcio,
      numero,
      direccion,
      cp,
      foto_restaurante,
      dieta
    });

    await restaurant.addTipoCocina(cocinasId)

    res.status(201).json({
      id: restaurant.id,
      nombre_restaurante: restaurant.nombre,
    })

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* --------------------------------- LOGIN -------------------------------- */
router.post("/loginRest", async (req, res) => {
  const { correo, password } = req.body; // Obté l'correo i la contrasenya de la petició
  try {
    const restaurant = await Restaurante.findOne({
      where: { correo },
    }); // Cerca l'usuari pel seu email
    if (!restaurant) {
      return res.status(404).json({ error: "User no trobat" }); // Retorna error 404 si l'usuari no es troba
    }
    const passwordMatch = await bcrypt.compare(
      password,
      restaurant.password
    ); // Compara la contrasenya proporcionada amb la contrasenya encriptada de l'usuari
    if (!passwordMatch) {
      return res.status(401).json({ error: "Password incorrecte" }); // Retorna error 401 si la contrasenya és incorrecta
    }
    const token = jwt.sign(
      { id: restaurant.id, nombre: restaurant.nombre },
      SECRET_KEY,
      { expiresIn: "2h" }
    ); // Genera un token JWT vàlid durant 2 hores
    res.cookie("token", token, { httpOnly: false, maxAge: 7200000 }); // Estableix el token com una cookie
    res.json({ nombre: restaurant.nombre, id: restaurant.id }); // Retorna missatge d'èxit
  } catch (error) {
    res.status(500).json({ error: error.message }); // Retorna error 500 amb el missatge d'error
  }
});


// creacion de promociones
router.post("/promos", async (req, res) => {
  try {
    const { codigo, restId, userInsta } = req.body

    await Promo.create({
      codigo: codigo,
      validada: true,
      usuarioInstagram: userInsta,
      RestauranteId: restId
    })
    res.status(200).json({ in: true, message: "Promo creada" });
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get("/profileRest/:restId", async (req, res) => {
  try {
    const restId = req.params.restId

    const rest = await Restaurante.findByPk(restId)
    const tiposCocinas = await rest.getTipoCocinas()

    const promosRest = await Promo.findAll({
      where: {
        RestauranteId: restId
      }
    })

    let recetasRest = await Receta.findAll({
      where: {
        RestauranteId: restId
      }
    })

    recetasRest = await Promise.all(recetasRest.map(async receta => {
      const tipoCocinaReceta = await receta.getTipoCocina()
      const nombreRestaurante = await receta.getRestaurante()
      return {
        receta: receta.dataValues,
        nombreRestaurante: nombreRestaurante.nombre,
        tipoCocinaReceta: tipoCocinaReceta.nombre_tipo,
        recetaInUser: true
      }
    }))

    res.status(200).json({ promosRest, recetasRest, tiposCocinas });
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
})


router.get("/promos/:restId", async (req, res) => {
  try {
    const restId = req.params.restId
    const promosRest = await Promo.findAll({
      where: {
        RestauranteId: restId
      }
    })
    res.status(200).json({ promosRest });
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
})




/* --------------------------- Seguir restaurante --------------------------- */
router.post("/seguirRest/:restId", checkToken, async (req, res) => {
  try {
    const { restId } = req.params;

    // Verifica si el usuario y el restaurante existen
    const usuario = await Usuario.findByPk(req.userId);
    const restaurante = await Restaurante.findByPk(restId);
    console.log(restaurante)
    console.log(usuario)
    if (!usuario || !restaurante) {
      return res
        .status(404)
        .json({ error: "Usuario o restaurante no encontrado" });
    }
    // Verifica si le sigue o no
    const existeRelacion = await usuario.hasRestaurante(restaurante);
    if (existeRelacion) {
      await usuario.removeRestaurante(restaurante)
      return res.status(200).json({ in: false, message: "Relación eliminada" });
    } else {
      // Crea una nueva entrada en la tabla intermedia
      await usuario.addRestaurante(restaurante);
      res.status(200).json({ in: true, message: "Relación creada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/*                                  RECETAS                                 */
/* -------------------------------------------------------------------------- */

router.get("/home/recetas", checkToken, async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.userId);
    const tipos_cocinas_user = await user.getTipoCocinas();
    let alergias = await user.getGrupoAlimentos();
    alergias = alergias.map(alergia => alergia.id)

    //Obtener recetas Recomendadas
    const TipoCocinaId = tipos_cocinas_user.map(tipo => tipo.id)
    let recetasSugeridas
    if (user.dieta === 0) {
      recetasSugeridas = await Receta.findAll({ where: { TipoCocinaId } })
    } else if (user.dieta === 1) {
      recetasSugeridas = await Receta.findAll({ where: { TipoCocinaId, dieta: [1, 2] } })
    } else {
      recetasSugeridas = await Receta.findAll({ where: { TipoCocinaId, dieta: 2 } })
    }
    let recetasRecomendadas = await Promise.all(recetasSugeridas.map(async receta => {
      const ingredientesReceta = await receta.getIngredientes()
      const grupoAlimento = await Promise.all(ingredientesReceta.map(async ingrediente => ingrediente.getGrupoAlimento()))
      if (grupoAlimento.some(alimento => alergias.includes(alimento.id))) return
      const tipoCocinaReceta = await receta.getTipoCocina()
      const nombreRestaurante = await receta.getRestaurante()
      const recetaInUser = await user.hasReceta(receta);
      return {
        receta: receta.dataValues,
        nombreRestaurante: nombreRestaurante.nombre,
        tipoCocinaReceta: tipoCocinaReceta.nombre_tipo,
        recetaInUser: recetaInUser
      }
    }))
    recetasRecomendadas = recetasRecomendadas.filter(recetas => recetas)

    //Obtener Restaurantes Recomendadas
    const restaurantesCercanos = await Restaurante.findAll({ where: { cp: user.cp } })
    const RestauranteId = restaurantesCercanos.map(rest => rest.id)
    let recetasCercanas = await Receta.findAll({ where: { RestauranteId } })
    recetasCercanas = await Promise.all(recetasCercanas.map(async receta => {
      const tipoCocinaReceta = await receta.getTipoCocina()
      const nombreRestaurante = await receta.getRestaurante()
      const recetaInUser = await user.hasReceta(receta);
      return {
        receta: receta.dataValues,
        nombreRestaurante: nombreRestaurante.nombre,
        tipoCocinaReceta: tipoCocinaReceta.nombre_tipo,
        recetaInUser: recetaInUser
      }
    }))

    //Obtener recetas diferentes
    const allRecetas = Receta.findAll()
    let recetasNuevas = (await allRecetas).filter(receta => !TipoCocinaId.includes(receta.TipoCocinaId))
    recetasNuevas = await Promise.all(recetasNuevas.map(async receta => {
      const tipoCocinaReceta = await receta.getTipoCocina()
      const nombreRestaurante = await receta.getRestaurante()
      const recetaInUser = await user.hasReceta(receta);
      return {
        receta: receta.dataValues,
        nombreRestaurante: nombreRestaurante.nombre,
        tipoCocinaReceta: tipoCocinaReceta.nombre_tipo,
        recetaInUser: recetaInUser
      }
    }))


    res.status(201).json({ recetasRecomendadas, recetasCercanas, recetasNuevas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/receta/:id", checkToken, async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.userId)

    const id = req.params.id
    let receta = await Receta.findByPk(id)
    let restauranteReceta = await receta.getRestaurante()

    const ingredientesRecetas = await receta.getIngredientes()
    let grupoAlimentos = []
    await Promise.all(ingredientesRecetas.map(async ingrediente => {
      let alergiaIngrediente = await ingrediente.getGrupoAlimento()
      if (grupoAlimentos.includes(alergiaIngrediente.id)) return
      else grupoAlimentos = [...grupoAlimentos, alergiaIngrediente.id]
    }))
    const alergias = await GrupoAlimento.findAll({ where: { id: grupoAlimentos, alergeno: 1 } })
    const procedimientosReceta = await receta.getProcedimientos()
    const tipoCocina = await receta.getTipoCocina()
    const restInUser = await user.hasRestaurante(restauranteReceta)
    const recetaInUser = await user.hasReceta(receta)
    restauranteReceta = { ...restauranteReceta.dataValues, restInUser }
    receta = { ...receta.dataValues, recetaInUser }

    res.status(200).json({ restauranteReceta, receta, tipoCocina, alergias, ingredientesRecetas, procedimientosReceta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); // Llegeix un recipes específic



router.put("/home/:restId/recipes/:id", checkToken, async (req, res) => {
  try {
    const restaurantId = req.params.restId;
    const recipesId = req.params.restId;
    await updateRestItem(req, res, Receta, restaurantId, recipesId);
  } catch (error) {
    return res.status(404).json({ error: "Tipo de cocina no encontrado" });
  }
}); // Actualitza

router.delete("/recipes/:id", checkToken, async (req, res) => await deleteItem(req, res, Receta)); // Elimina un recipes

router.post("/seguirReceta/:recetaId", checkToken, async (req, res) => {
  try {
    const { recetaId } = req.params;

    const usuario = await Usuario.findByPk(req.userId);
    const receta = await Receta.findByPk(recetaId);

    if (!usuario || !receta) {
      return res
        .status(404)
        .json({ error: "Usuario o receta no encontrados" });
    }

    const sigueReceta = await usuario.hasReceta(receta);
    if (sigueReceta) {
      await usuario.removeReceta(receta);
      return res.status(200).json({ in: false, message: "Relación de seguimiento eliminada" });
    } else {
      await usuario.addReceta(receta);
      return res.status(200).json({ in: true, message: "Usuario sigue la receta" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


/* ----------------------------- CREAR RECETA ---------------------------- */
router.post("/home/:restId/registerReceta", upload.single("photo"), async (req, res) => {
  try {
    const {
      nombre_receta,
      desc_receta,
      TipoCocinaId,
      persones,
      tiempo,
      dificultad,
      tipo,
      ingredientes,
    } = req.body;

    console.log(nombre_receta,
      desc_receta,
      TipoCocinaId,
      persones,
      tiempo,
      dificultad,
      tipo,
      ingredientes,)

    const baseUrl = 'http://localhost:3000/api/uploads/'
    const foto_receta = req.file ? baseUrl + req.file.filename : null; // Obtiene la ruta del archivo subido

    const restauranteId = req.params.restId;

    // Verificar
    if (
      !nombre_receta ||
      !desc_receta ||
      !TipoCocinaId ||
      !ingredientes ||
      ingredientes.length === 0
    ) {
      return res
        .status(400)
        .json({
          error:
            "Nombre, descripción, TipoCocinaId, al menos un procedimiento y al menos un ingrediente son requeridos",
        });
    }


    // Mira si hay otra igual sengun el nombre de la receta en un mismo restaurante
    const existingReceta = await Receta.findOne({
      where: { nombre_receta, RestauranteId: restauranteId },
    });
    if (existingReceta) {
      return res
        .status(409)
        .json({
          error:
            "Ya existe una receta con el mismo nombre para este restaurante",
        });
    }


    const tipoCocina = await TipoCocina.findByPk(TipoCocinaId);
    if (!tipoCocina) {
      return res.status(404).json({ error: "Tipo de cocina no encontrado" });
    }

    // Crea ingredientes
    let dietaReceta = 2
    const ingredientesJSON = JSON.parse(ingredientes);
    const ingredientesId = ingredientesJSON.map(ingrediente => ingrediente.id)
    const ingredientesReceta = await Ingrediente.findAll({ where: { id: ingredientesId } })
    await Promise.all(ingredientesReceta.map(async ingrediente => {
      const alimentoIngrediente = await ingrediente.getGrupoAlimento()
      if (alimentoIngrediente.dieta == 1 && dietaReceta != 0) dietaReceta = 1
      else if (alimentoIngrediente.dieta == 0) dietaReceta = 0
    }))



    console.log("PASO 6", persones, tiempo, dificultad, tipo)
    // Crea receta
    const receta = await Receta.create({
      nombre_receta,
      desc_receta,
      TipoCocinaId,
      RestauranteId: restauranteId,
      dieta: dietaReceta,
      persones,
      tiempo,
      dificultad,
      tipo,
      foto_receta,
    });

    for (const ingrediente of ingredientesJSON) {
      const { id, cantidad, medida } = ingrediente;
      const recetaIngrediente = await Receta_Ingrediente.create({
        RecetumId: receta.id,
        IngredienteId: id,
        cantidad,
        medida,
      });
    }

    res.status(201).json({
      receta: {
        id: receta.id,
        nombre_receta: receta.nombre_receta,
        desc_receta: receta.desc_receta,
        TipoCocinaId: receta.TipoCocinaId,
        RestauranteId: restauranteId,
        foto_receta: foto_receta
      },
      ingredientes: ingredientes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/home/:restId/procedimientos", upload.array("photo", 7), async (req, res) => {
  try {
    const {
      procedimientos,
    } = req.body;
    console.log(procedimientos)
    const restauranteId = req.params.restId;
    const baseUrl = 'http://localhost:3000/api/uploads/';
    const procedimientosCreados = [];
    let indexFoto = 0;

    for (const procedimiento of procedimientos) {
      const { numero_procedimiento, desc_procedimiento } = procedimiento;


      const fotos_procedimiento = req.files.map(file => baseUrl + file.filename);

      console.log(fotos_procedimiento)


      const nuevoProcedimiento = await Procedimiento.create({
        numero_procedimiento,
        desc_procedimiento,
        foto_procedimiento: fotos_procedimiento[indexFoto],
        RestauranteId: restauranteId
      });

      procedimientosCreados.push(nuevoProcedimiento);
      indexFoto++;
    }

    res.status(201).json({
      message: "Procedimientos creados exitosamente",
      procedimientos: procedimientosCreados
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
);
//filtro por palabra
router.post("/recetasPorPalabra", async (req, res) => {
  try {
    const { palabra } = req.body; // Obtén la palabra del cuerpo de la solicitud
    // Busca todas las recetas que comiencen con la palabra dada
    const recetas = await Receta.findAll({
      where: {
        nombre_receta: {
          [Op.like]: `%${palabra}%` // Usa el operador de sequelize para buscar recetas que comiencen con la palabra
        }
      }
    });

    res.status(200).json({
      recetas: recetas,
    }); // Devuelve las recetas encontradas
  } catch (error) {
    res.status(500).json({ error: error.message }); // Maneja cualquier error y devuelve un mensaje de error
  }
});

// filtro por tipo de comida
router.get("/recipesByType/:typeId", async (req, res) => {
  try {
    const typeId = req.params.typeId; // Obtiene el ID del tipo de comida del parámetro de la ruta

    // Busca el tipo de cocina por su ID
    const tipoCocina = await TipoCocina.findByPk(typeId);
    if (!tipoCocina) {
      return res.status(404).json({ error: "Tipo de comida no encontrado" });
    }

    // Busca las recetas que corresponden al tipo de comida dado
    const recetas = await Receta.findAll({
      where: { TipoCocinaId: typeId },
    });

    res.status(200).json({ recetas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// filtro por codigo postal
router.get("/cp/:codigoPostal", async (req, res) => {
  try {
    const codigoPostal = req.params.codigoPostal;

    // Buscas Restaurantes por el codigo postal del params
    const restaurantes = await Restaurante.findAll({ where: { cp: codigoPostal } });

    // cojes los ids
    const restaurantesIds = restaurantes.map(restaurante => restaurante.id);

    // i buscas todas las recetas que tengan ese id
    const recetas = await Receta.findAll({ where: { RestauranteId: restaurantesIds } });

    // las devuelves
    res.json({ recetas, restaurantes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/tipuscuina", async (req, res) => await readItems(req, res, TipoCocina));
router.get("/ingredientes", async (req, res) => await readItems(req, res, Ingrediente));


router.get('/uploads/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'uploads', fileName);

  // Envía el archivo al cliente
  res.sendFile(filePath);
});
module.exports = router; // Exporta el router amb les rutes definides