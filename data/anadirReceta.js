

const { Receta, Ingrediente, GrupoAlimento, TipoCocina, Receta_Ingrediente, Restaurante } = require('../models'); // Importa los modelos definidos en tu archivo

async function anadirReceta() {
    try {
        const recetaObj = [
            {
                "nombre_receta": "Pasta Alfredo con Pollo",
                "desc_receta": "Una exquisita pasta cremosa con pollo y salsa Alfredo",
                "persones": "2",
                "tiempo": "30 minutos",
                "dificultad": "Fácil",
                "tipo": "Principal",
                "foto_receta": "receta1.jpg",
                "RestauranteId": 2,
                "TipoCocinaId": [5],
                ingredientes: [
                    {
                        "IngredienteId": 24,
                        "cantidad": 250,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 11,
                        "cantidad": 300,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 27,
                        "cantidad": 200,
                        "medida": "mililitros"
                    },
                    {
                        "IngredienteId": 17,
                        "cantidad": 100,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 21,
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
                        "IngredienteId": 28,
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
                "nombre_receta": "Patatas Bravas",
                "desc_receta": "Deliciosas patatas fritas cubiertas con una salsa picante y una alioli suave.",
                "persones": "4",
                "tiempo": "40 minutos",
                "dificultad": "Media",
                "tipo": "Acompañamiento",
                "foto_receta": "patatas_bravas.jpg",
                "RestauranteId": 1,
                "TipoCocinaId": [5],
                "ingredientes": [
                  {
                    "IngredienteId": 39,
                    "cantidad": 600,
                    "medida": "gramos"
                  },
                  {
                    "IngredienteId": 144,
                    "cantidad": 3,
                    "medida": "unidades"
                  },
                  {
                    "IngredienteId": 33,
                    "cantidad": 100,
                    "medida": "mililitros"
                  },
                  {
                    "IngredienteId": 34,
                    "cantidad": 200,
                    "medida": "mililitros"
                  },
                  {
                    "IngredienteId": 38,
                    "cantidad": 50,
                    "medida": "mililitros"
                  },
                  {
                    "IngredienteId": 3,
                    "cantidad": 1,
                    "medida": "unidad"
                  },
                  {
                    "IngredienteId": 37,
                    "cantidad": 10,
                    "medida": "gramos"
                  },
                  {
                    "IngredienteId": 2,
                    "cantidad": 2,
                    "medida": "dientes"
                  },
                  {
                    "IngredienteId": 27,
                    "cantidad": 2,
                    "medida": "cucharadas"
                  },
                  {
                    "IngredienteId": 27,
                    "cantidad": 20,
                    "medida": "gramos"
                  },
                  {
                    "IngredienteId": 31,
                    "cantidad": 500,
                    "medida": "mililitros"
                  },
                  {
                    "IngredienteId": 29,
                    "cantidad": 10,
                    "medida": "gramos"
                  }
                ],
                "procedimientos": [
                  {
                    "numero_procedimiento": 1,
                    "desc_procedimiento": "Pelar y cortar las patatas en cubos. Freír en aceite caliente hasta que estén doradas y crujientes.",
                    "foto_procedimiento": "patatas_bravas_1.jpg"
                  },
                  {
                    "numero_procedimiento": 2,
                    "desc_procedimiento": "En una sartén, calentar el aceite de oliva y sofreír el ajo picado. Agregar el tomate frito y el pimentón. Cocinar unos minutos.",
                    "foto_procedimiento": "patatas_bravas_2.jpg"
                  },
                  {
                    "numero_procedimiento": 3,
                    "desc_procedimiento": "Agregar el caldo de pollo y cocinar a fuego lento hasta que la salsa espese ligeramente.",
                    "foto_procedimiento": "patatas_bravas_3.jpg"
                  },
                  {
                    "numero_procedimiento": 4,
                    "desc_procedimiento": "Por separado, mezclar la mayonesa con el ajo picado y el perejil. Reservar como alioli.",
                    "foto_procedimiento": "patatas_bravas_4.jpg"
                  },
                  {
                    "numero_procedimiento": 5,
                    "desc_procedimiento": "Servir las patatas en platos individuales, cubrir con la salsa picante y servir el alioli al lado.",
                    "foto_procedimiento": "patatas_bravas_5.jpg"
                  }
                ]
              },
              {
                "nombre_receta": "Salmorejo Cordobés",
                "desc_receta": "Una versión espesa y deliciosa del gazpacho, con tomate, pan y aceite de oliva.",
                "persones": "3",
                "tiempo": "20 minutos",
                "dificultad": "Fácil",
                "tipo": "Entrante",
                "foto_receta": "salmorejo_cordobes.jpg",
                "RestauranteId": 1,
                "TipoCocinaId": [2],
                "ingredientes": [
                  {
                    "IngredienteId": 5,
                    "cantidad": 1,
                    "medida": "kilogramo"
                  },
                  {
                    "IngredienteId": 142,
                    "cantidad": 1,
                    "medida": "unidad"
                  },
                  {
                    "IngredienteId": 1,
                    "cantidad": 1,
                    "medida": "unidad"
                  },
                  {
                    "IngredienteId": 31,
                    "cantidad": 1,
                    "medida": "unidad"
                  },
                  {
                    "IngredienteId": 2,
                    "cantidad": 2,
                    "medida": "dientes"
                  },
                  {
                    "IngredienteId": 29,
                    "cantidad": 30,
                    "medida": "gramos"
                  },
                  {
                    "IngredienteId": 47,
                    "cantidad": 15,
                    "medida": "mililitros"
                  },
                  {
                    "IngredienteId": 48,
                    "cantidad": 15,
                    "medida": "mililitros"
                  },

                  {
                    "IngredienteId": 51,
                    "cantidad": 2,
                    "medida": "unidad"
                  },
                  {
                    "IngredienteId": 143,
                    "cantidad": 15,
                    "medida": "gramos"
                  },
                  {
                    "IngredienteId": 28,
                    "cantidad": 5,
                    "medida": "gramos"
                  },
                  {
                    "IngredienteId": 144,
                    "cantidad": 2,
                    "medida": "cucharadas"
                  },
                ],
                "procedimientos": [
                  {
                    "numero_procedimiento": 1,
                    "desc_procedimiento": "Pelar los tomates y quitar las semillas. Trocear el pan.",
                    "foto_procedimiento": "salmorejo_cordobes_1.jpg"
                  },
                  {
                    "numero_procedimiento": 2,
                    "desc_procedimiento": "En una licuadora, mezclar los tomates, el pan, el ajo, el vinagre y la sal. Triturar hasta obtener una mezcla suave.",
                    "foto_procedimiento": "salmorejo_cordobes_2.jpg"
                  },
                  {
                    "numero_procedimiento": 3,
                    "desc_procedimiento": "Agregar el aceite de oliva poco a poco mientras se sigue mezclando, hasta que quede bien emulsionado.",
                    "foto_procedimiento": "salmorejo_cordobes_3.jpg"
                  },
                  {
                    "numero_procedimiento": 4,
                    "desc_procedimiento": "Refrigerar por al menos una hora antes de servir.",
                    "foto_procedimiento": "salmorejo_cordobes_4.jpg"
                  },
                  {
                    "numero_procedimiento": 5,
                    "desc_procedimiento": "Servir frío, decorado con huevo duro picado y jamón serrano en tiras.",
                    "foto_procedimiento": "salmorejo_cordobes_5.jpg"
                  }
                ]
              },
              {
                "nombre_receta": "Paella Valenciana",
                "desc_receta": "Un clásico plato español lleno de sabor y color, con arroz, mariscos y pollo.",
                "persones": "6",
                "tiempo": "45 minutos",
                "dificultad": "Media",
                "tipo": "Principal",
                "foto_receta": "paella_valenciana.jpg",
                "RestauranteId": 2,
                "TipoCocinaId": [9],
                "ingredientes": [
                  {
                    "IngredienteId": 41,
                    "cantidad": 400,
                    "medida": "gramos"
                  },
                  {
                    "IngredienteId": 100,
                    "cantidad": 500,
                    "medida": "gramos"
                  },
                  {
                    "IngredienteId": 97,
                    "cantidad": 300,
                    "medida": "gramos"
                  },
                  {
                    "IngredienteId": 140,
                    "cantidad": 200,
                    "medida": "gramos"
                  },
                  {
                    "IngredienteId": 15,
                    "cantidad": 1,
                    "medida": "unidad"
                  },
                  {
                    "IngredienteId": 2,
                    "cantidad": 2,
                    "medida": "dientes"
                  },
                  {
                    "IngredienteId": 141,
                    "cantidad": 50,
                    "medida": "gramos"
                  },
                  {
                    "IngredienteId": 32,
                    "cantidad": 1,
                    "medida": "unidad"
                  },
                  {
                    "IngredienteId": 3,
                    "cantidad": 1,
                    "medida": "unidad"
                  }
                ],
                "procedimientos": [
                  {
                    "numero_procedimiento": 1,
                    "desc_procedimiento": "En una paellera, dorar el pollo y el conejo con aceite de oliva. Retirar y reservar.",
                    "foto_procedimiento": "paella_valenciana_1.jpg"
                  },
                  {
                    "numero_procedimiento": 2,
                    "desc_procedimiento": "En la misma paellera, sofreír la cebolla y el pimiento rojo hasta que estén tiernos. Agregar el ajo picado y el tomate rallado. Cocinar unos minutos.",
                    "foto_procedimiento": "paella_valenciana_2.jpg"
                  },
                  {
                    "numero_procedimiento": 3,
                    "desc_procedimiento": "Incorporar el arroz y remover para que se impregne de los sabores. Agregar el caldo de pescado caliente y el azafrán. Cocinar a fuego medio-alto durante 10 minutos.",
                    "foto_procedimiento": "paella_valenciana_3.jpg"
                  },
                  {
                    "numero_procedimiento": 4,
                    "desc_procedimiento": "Colocar los mariscos y el pollo reservados sobre el arroz. Cocinar a fuego medio-bajo durante otros 10 minutos.",
                    "foto_procedimiento": "paella_valenciana_4.jpg"
                  },
                  {
                    "numero_procedimiento": 5,
                    "desc_procedimiento": "Retirar del fuego, cubrir con papel de aluminio y dejar reposar durante 5 minutos antes de servir.",
                    "foto_procedimiento": "paella_valenciana_5.jpg"
                  }
                ]
              }
              
              
              
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
