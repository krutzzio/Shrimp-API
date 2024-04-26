

const { Receta, Ingrediente, GrupoAlimento, TipoCocina, Receta_Ingrediente, Restaurante } = require('../models'); // Importa los modelos definidos en tu archivo

async function anadirReceta() {
  try {
    const recetaObj = require("./recetas.json")

    for (const receta of recetaObj) {
      const recetaCreada = await Receta.create(receta);
      for (const ingrediente of receta.ingredientes) {
        await Receta_Ingrediente.create({
          RecetumId: recetaCreada.id,
          IngredienteId: ingrediente.IngredienteId,
          cantidad: ingrediente.cantidad,
          medida: ingrediente.medida
        })
      }
      for (const procedimiento of receta.procedimientos) {
        await recetaCreada.createProcedimiento(procedimiento)
      }
    }

    console.log('Datos creados exitosamente.');
  } catch (error) {
    console.error('Error al crear datos:', error);
  }
}

module.exports = anadirReceta 
