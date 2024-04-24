

const { Receta, Ingrediente, GrupoAlimento, TipoCocina, Receta_Ingrediente, Restaurante } = require('../models'); // Importa los modelos definidos en tu archivo

async function anadirReceta() {
    try {
        const recetaObj = [
            {
                "nombre_receta": "Pasta Alfredo con Pollo",
                "desc_receta": "Una exquisita pasta cremosa con pollo y salsa Alfredo",
                "personas": "4",
                "tiempo": "30 minutos",
                "dificultad": "Fácil",
                "tipo": "Principal",
                "foto_receta": "receta1.jpg",
                "RestauranteId": 2,
                "TipoCocinaId": [5],
                ingredientes: [
                    {
                        "IngredienteId": 44,
                        "cantidad": 250,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 51,
                        "cantidad": 300,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 59,
                        "cantidad": 200,
                        "medida": "mililitros"
                    },
                    {
                        "IngredienteId": 57,
                        "cantidad": 100,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 61,
                        "cantidad": 50,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 2,
                        "cantidad": 2,
                        "medida": "dientes"
                    },
                    {
                        "IngredienteId": 29,
                        "cantidad": 2,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 27,
                        "cantidad": 2,
                        "medida": "gramos"
                    }
                ],
                procedimientos: [
                    {
                        "numero_procedimiento": 1,
                        "desc_procedimiento": "Cocinar la pasta según las instrucciones del paquete. Escurrir y reservar.",
                        "foto_procedimiento": "procedimiento1.jpg"
                    },
                    {
                        "numero_procedimiento": 2,
                        "desc_procedimiento": "Cortar la pechuga de pollo en trozos y cocinar en una sartén con un poco de aceite hasta que esté dorada por fuera y cocida por dentro.",
                        "foto_procedimiento": "procedimiento2.jpg"
                    },
                    {
                        "numero_procedimiento": 3,
                        "desc_procedimiento": "En la misma sartén, derretir la mantequilla y saltear el ajo picado hasta que esté fragante.",
                        "foto_procedimiento": "procedimiento3.jpg"
                    },
                    {
                        "numero_procedimiento": 4,
                        "desc_procedimiento": "Agregar la crema de leche y el queso parmesano rallado. Cocinar a fuego lento hasta que la salsa espese ligeramente.",
                        "foto_procedimiento": "procedimiento1.jpg"
                    },
                    {
                        "numero_procedimiento": 5,
                        "desc_procedimiento": "Incorporar la pasta cocida y el pollo a la salsa. Mezclar bien y calentar todo junto.",
                        "foto_procedimiento": "procedimiento2.jpg"
                    },
                    {
                        "numero_procedimiento": 6,
                        "desc_procedimiento": "Sazonar con sal y pimienta al gusto. Servir caliente y disfrutar.",
                        "foto_procedimiento": "procedimiento3.jpg"
                    }
                ]
            },
            {
                "nombre_receta": "Pasta con Pollo",
                "desc_receta": "Una exquisita salsa pasta",
                "personas": "4",
                "tiempo": "30 minutos",
                "dificultad": "Fácil",
                "tipo": "Principal",
                "foto_receta": "receta1.jpg",
                "RestauranteId": 6,
                "TipoCocinaId": [5],
                ingredientes: [
                    {
                        "IngredienteId": 44,
                        "cantidad": 250,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 51,
                        "cantidad": 300,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 59,
                        "cantidad": 200,
                        "medida": "mililitros"
                    },
                    {
                        "IngredienteId": 57,
                        "cantidad": 100,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 61,
                        "cantidad": 50,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 2,
                        "cantidad": 2,
                        "medida": "dientes"
                    },
                    {
                        "IngredienteId": 29,
                        "cantidad": 2,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 27,
                        "cantidad": 2,
                        "medida": "gramos"
                    }
                ],
                procedimientos: [
                    {
                        "numero_procedimiento": 1,
                        "desc_procedimiento": "Cocinar la pasta según las instrucciones del paquete. Escurrir y reservar.",
                        "foto_procedimiento": "procedimiento1.jpg"
                    },
                    {
                        "numero_procedimiento": 2,
                        "desc_procedimiento": "Cortar la pechuga de pollo en trozos y cocinar en una sartén con un poco de aceite hasta que esté dorada por fuera y cocida por dentro.",
                        "foto_procedimiento": "procedimiento2.jpg"
                    },
                    {
                        "numero_procedimiento": 3,
                        "desc_procedimiento": "En la misma sartén, derretir la mantequilla y saltear el ajo picado hasta que esté fragante.",
                        "foto_procedimiento": "procedimiento3.jpg"
                    },
                    {
                        "numero_procedimiento": 4,
                        "desc_procedimiento": "Agregar la crema de leche y el queso parmesano rallado. Cocinar a fuego lento hasta que la salsa espese ligeramente.",
                        "foto_procedimiento": "procedimiento1.jpg"
                    },
                    {
                        "numero_procedimiento": 5,
                        "desc_procedimiento": "Incorporar la pasta cocida y el pollo a la salsa. Mezclar bien y calentar todo junto.",
                        "foto_procedimiento": "procedimiento2.jpg"
                    },
                    {
                        "numero_procedimiento": 6,
                        "desc_procedimiento": "Sazonar con sal y pimienta al gusto. Servir caliente y disfrutar.",
                        "foto_procedimiento": "procedimiento3.jpg"
                    }
                ]
            },
        ]

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
