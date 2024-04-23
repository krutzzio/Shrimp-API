const express = require("express"); // Importa la llibreria Express per gestionar les rutes
const router = express.Router(); // Crea un router d'Express
const bcrypt = require("bcrypt"); // Importa la llibreria bcrypt per a encriptar contrasenyes
const jwt = require("jsonwebtoken"); // Importa la llibreria jsonwebtoken per a generar i verificar JWT
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const SECRET_KEY = "vols-que-et-punxi-amb-un-punxo";

const {
  // Usuario_Restaraunte,

  Usuario,
  Restaurante,
  Receta,
  TipoCocina,

  Receta_Ingrediente,
  GrupoAlimento,
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
router.get(
  "/users",
  checkToken,
  async (req, res) => await readItems(req, res, Usuario)
); // Llegeix tots els usuaris
// router.get(
//   "/users/:id",
//   checkToken,
//   async (req, res) => await readItem(req, res, Usuario)
// ); // Llegeix un usuari específic

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



/* --------------------------- Seguir restaurante --------------------------- */
router.post("/home/:restId/seguirRestaurante", checkToken, async (req, res) => {
  try {
    const { userId } = req.body; // QUE ES MEJOR TENER EL USAURIO EN REQ.BODY O EL RESTAURANTE
    const restauranteId = req.params.restId;

    // Verifica si el usuario y el restaurante existen
    const usuario = await Usuario.findByPk(userId);
    const restaurante = await Restaurante.findByPk(restauranteId);

    if (!usuario || !restaurante) {
      return res
        .status(404)
        .json({ error: "Usuario o restaurante no encontrado" });
    }

    // Verifica si le sigue o no
    const existeRelacion = await usuario.hasRestaurante(restaurante);
    if (existeRelacion) {
      return res.status(409).json({ error: "El usuario ya lo sigue " });
    }

    // Crea una nueva entrada en la tabla intermedia
    await usuario.addRestaurante(restaurante);

    res.status(200).json({ message: "Usuario sigue al restaurante " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/*                                RESTAURANTE                               */
/* -------------------------------------------------------------------------- */

router.get("/restaurant", checkToken, async (req, res) => await readItems(req, res, Restaurante)
); // Llegeix tots els restaurants
router.get("/restaurant/:id", checkToken, async (req, res) => await readItem(req, res, Restaurante)
); // Llegeix un restaurant específic
router.put("/restaurant/:id", checkToken, async (req, res) => await updateItem(req, res, Restaurante)
); // Actualitza un restaurant
router.delete("/restaurant/:id", checkToken, async (req, res) => await deleteItem(req, res, Restaurante)
); // Elimina un restaurant

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
      tipos_cocina
    } = req.body;

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
    });

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

/* -------------------------------------------------------------------------- */
/*                                  RECETAS                                 */
/* -------------------------------------------------------------------------- */

router.get(
  "/home/:restId/recipes/:id",
  checkToken,
  async (req, res) => await readItems(req, res, Receta)
); // Llegeix tots els restaurants
router.get(
  "/recipes/:id",
  checkToken,
  async (req, res) => await readItem(req, res, Receta)
); // Llegeix un recipes específic
router.put("/home/:restId/recipes/:id", checkToken, async (req, res) => {
  try {
    const restaurantId = req.params.restId;
    const recipesId = req.params.restId;
    await updateRestItem(req, res, Receta, restaurantId, recipesId);
  } catch (error) {
    return res.status(404).json({ error: "Tipo de cocina no encontrado" });
  }
}); // Actualitza
router.delete(
  "/recipes/:id",
  checkToken,
  async (req, res) => await deleteItem(req, res, Receta)
); // Elimina un recipes

/* ----------------------------- CREAR RECETA ---------------------------- */
router.post(
  "/home/:restId/registerReceta",

  upload.single("photo"),
  async (req, res) => {
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

      // Crea receta
      const receta = await Receta.create({
        nombre_receta,
        desc_receta,
        TipoCocinaId,
        RestauranteId: restauranteId,
        persones,
        tiempo,
        dificultad,
        tipo,
        foto_receta,
      });

      // Crea ingredientes
      for (const ingrediente of ingredientes) {
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
  }
);



router.get('/uploads/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'uploads', fileName);

  // Envía el archivo al cliente
  res.sendFile(filePath);
});
module.exports = router; // Exporta el router amb les rutes definides
