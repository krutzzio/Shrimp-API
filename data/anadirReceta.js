

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
                "tipo": "Entrante",
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
              },
              {
                "nombre_receta": "Tortilla a la Francesa",
                "desc_receta": "Una deliciosa tortilla básica hecha con huevos y sazonada al estilo francés.",
                "persones": "2",
                "tiempo": "15 minutos",
                "dificultad": "Fácil",
                "tipo": "Principal",
                "foto_receta": "tortilla_francesa.jpg",
                "RestauranteId": 1,
                "TipoCocinaId": [9],
                "ingredientes": [
                  {
                    "IngredienteId": 51,
                    "cantidad": 4,
                    "medida": "unidades"
                  },
                  {
                    "IngredienteId": 54,
                    "cantidad": 50,
                    "medida": "gramos"
                  },
                  {
                    "IngredienteId": 27,
                    "cantidad": 1,
                    "medida": "pizca"
                  },
                  {
                    "IngredienteId": 29,
                    "cantidad": 1,
                    "medida": "pizca"
                  }
                ],
                "procedimientos": [
                  {
                    "numero_procedimiento": 1,
                    "desc_procedimiento": "Batir los huevos en un tazón y sazonar con sal y pimienta al gusto.",
                    "foto_procedimiento": "tortilla_francesa_1.jpg"
                  },
                  {
                    "numero_procedimiento": 2,
                    "desc_procedimiento": "Calentar una sartén antiadherente a fuego medio-alto. Agregar la mantequilla y dejar que se derrita.",
                    "foto_procedimiento": "tortilla_francesa_2.jpg"
                  },
                  {
                    "numero_procedimiento": 3,
                    "desc_procedimiento": "Verter los huevos batidos en la sartén caliente y cocinar durante unos minutos hasta que estén dorados por abajo.",
                    "foto_procedimiento": "tortilla_francesa_3.jpg"
                  },
                  {
                    "numero_procedimiento": 4,
                    "desc_procedimiento": "Con la ayuda de una espátula, voltear la tortilla y cocinar por el otro lado hasta que esté dorada y cocida por completo.",
                    "foto_procedimiento": "tortilla_francesa_4.jpg"
                  },
                  {
                    "numero_procedimiento": 5,
                    "desc_procedimiento": "Transferir la tortilla a un plato, cortar en porciones y servir caliente.",
                    "foto_procedimiento": "tortilla_francesa_5.jpg"
                  }
                ]
              },
              {
                "nombre_receta": "Trucha con Limón y Arroz",
                "desc_receta": "Una exquisita combinación de trucha y limón acompañada de arroz, perfecta para una comida saludable y deliciosa.",
                "persones": "4",
                "tiempo": "30 minutos",
                "dificultad": "Media",
                "tipo": "Principal",
                "foto_receta": "trucha_limón_arroz.jpg",
                "RestauranteId": 3,
                "TipoCocinaId": [9],
                "ingredientes": [
                  {
                    "IngredienteId": 49,
                    "cantidad": 4,
                    "medida": "filetes"
                  },
                  {
                    "IngredienteId": 100,
                    "cantidad": 300,
                    "medida": "gramos"
                  },
                  {
                    "IngredienteId": 41,
                    "cantidad": 250,
                    "medida": "gramos"
                  },
                  {
                    "IngredienteId": 27,
                    "cantidad": 1,
                    "medida": "pizca"
                  },
                  {
                    "IngredienteId": 28,
                    "cantidad": 1,
                    "medida": "pizca"
                  },
                  {
                    "IngredienteId": 143,
                    "cantidad": 2,
                    "medida": "unidades"
                  }
                ],
                "procedimientos": [
                  {
                    "numero_procedimiento": 1,
                    "desc_procedimiento": "Cocinar el arroz de acuerdo a las instrucciones del paquete. Reservar caliente.",
                    "foto_procedimiento": "trucha_limón_arroz_1.jpg"
                  },
                  {
                    "numero_procedimiento": 2,
                    "desc_procedimiento": "Sazonar los filetes de trucha con sal y pimienta al gusto.",
                    "foto_procedimiento": "trucha_limón_arroz_2.jpg"
                  },
                  {
                    "numero_procedimiento": 3,
                    "desc_procedimiento": "Calentar una sartén a fuego medio-alto con un poco de aceite de oliva. Cocinar los filetes de trucha hasta que estén dorados por ambos lados y cocidos en su punto.",
                    "foto_procedimiento": "trucha_limón_arroz_3.jpg"
                  },
                  {
                    "numero_procedimiento": 4,
                    "desc_procedimiento": "Servir los filetes de trucha sobre una cama de arroz caliente.",
                    "foto_procedimiento": "trucha_limón_arroz_4.jpg"
                  },
                  {
                    "numero_procedimiento": 5,
                    "desc_procedimiento": "Exprimir el jugo de limón sobre los filetes de trucha y decorar con rodajas de limón fresco. ¡Disfrutar!",
                    "foto_procedimiento": "trucha_limón_arroz_5.jpg"
                  }
                ]
              },
              {
                "nombre_receta": "Estofado de Carne",
                "desc_receta": "Un reconfortante plato de estofado lleno de sabor y aromas, perfecto para los días fríos.",
                "persones": "4",
                "tiempo": "2 horas",
                "dificultad": "Media",
                "tipo": "Principal",
                "foto_receta": "estofado_carne.jpg",
                "RestauranteId": 3,
                "TipoCocinaId": [6],
                "ingredientes": [
                  {
                    "IngredienteId": 105,
                    "cantidad": 600,
                    "medida": "gramos" 
                  },
                  {
                    "IngredienteId": 2,
                    "cantidad": 2,
                    "medida": "dientes" 
                  },
                  {
                    "IngredienteId": 3,
                    "cantidad": 1,
                    "medida": "unidad" 
                  },
                  {
                    "IngredienteId": 7,
                    "cantidad": 2,
                    "medida": "unidad" 
                  },
                  {
                    "IngredienteId": 6,
                    "cantidad": 2,
                    "medida": "unidad" 
                  },
                  {
                    "IngredienteId": 1,
                    "cantidad": 2,
                    "medida": "cucharadas" 
                  },
                  {
                    "IngredienteId": 146,
                    "cantidad": 500,
                    "medida": "ml" 
                  },
                  {
                    "IngredienteId": 23,
                    "cantidad": 1,
                    "medida": "hoja" 
                  },
                  {
                    "IngredienteId": 21,
                    "cantidad": 1,
                    "medida": "rama" 
                  },
                  {
                    "IngredienteId": 20,
                    "cantidad": 1,
                    "medida": "ramita" 
                  },
                  {
                    "IngredienteId": 28,
                    "cantidad": 1,
                    "medida": "pizca" 
                  },
                  {
                    "IngredienteId": 29,
                    "cantidad": 1,
                    "medida": "pizca" 
                  },
                  {
                    "IngredienteId": 27,
                    "cantidad": 1,
                    "medida": "cucharadita" 
                  }
                ],
                "procedimientos": [
                  {
                    "numero_procedimiento": 1,
                    "desc_procedimiento": "En una olla grande, calentar el aceite de oliva a fuego medio-alto. Dorar la carne de ternera por todos lados. Retirar y reservar.",
                    "foto_procedimiento": "estofado_paso1.jpg"
                  },
                  {
                    "numero_procedimiento": 2,
                    "desc_procedimiento": "En la misma olla, agregar un poco más de aceite si es necesario y sofreír el ajo y la cebolla hasta que estén dorados.",
                    "foto_procedimiento": "estofado_paso2.jpg"
                  },
                  {
                    "numero_procedimiento": 3,
                    "desc_procedimiento": "Agregar las papas y zanahorias cortadas en trozos grandes a la olla. Cocinar por unos minutos.",
                    "foto_procedimiento": "estofado_paso3.jpg"
                  },
                  {
                    "numero_procedimiento": 4,
                    "desc_procedimiento": "Regresar la carne de ternera a la olla. Agregar el caldo de carne, laurel, tomillo, romero, pimienta negra, pimienta roja y sal.",
                    "foto_procedimiento": "estofado_paso4.jpg"
                  },
                  {
                    "numero_procedimiento": 5,
                    "desc_procedimiento": "Cubrir la olla y reducir el fuego a bajo. Cocinar a fuego lento durante aproximadamente 1 hora y media o hasta que la carne esté tierna.",
                    "foto_procedimiento": "estofado_paso5.jpg"
                  },
                  {
                    "numero_procedimiento": 6,
                    "desc_procedimiento": "Servir caliente y disfrutar de este reconfortante estofado de carne.",
                    "foto_procedimiento": "estofado_paso6.jpg"
                  }
                ]
              },
              {
                "nombre_receta": "Gazpacho Andaluz",
                "desc_receta": "Una deliciosa sopa fría típica de la región de Andalucía, perfecta para los días calurosos.",
                "persones": "4",
                "tiempo": "20 minutos",
                "dificultad": "Fácil",
                "tipo": "Entrante",
                "foto_receta": "gazpacho_andaluz.jpg",
                "RestauranteId": 4,
                "TipoCocinaId": [1],
                "ingredientes": [
                  {
                    "IngredienteId": 5,
                    "cantidad": 6,
                    "medida": "tomates" // Tomates maduros
                  },
                  {
                    "IngredienteId": 3,
                    "cantidad": 1,
                    "medida": "unidad" // Cebolla
                  },
                  {
                    "IngredienteId": 2,
                    "cantidad": 1,
                    "medida": "diente" // Ajo
                  },
                  {
                    "IngredienteId": 1,
                    "cantidad": 2,
                    "medida": "cucharadas" // Aceite de oliva
                  },
                  {
                    "IngredienteId": 31,
                    "cantidad": 2,
                    "medida": "cucharadas" // Vinagre de vino
                  },
                  {
                    "IngredienteId": 22,
                    "cantidad": 1,
                    "medida": "rama" // Laurel
                  },
                  {
                    "IngredienteId": 20,
                    "cantidad": 1,
                    "medida": "ramita" // Romero
                  },
                  {
                    "IngredienteId": 4,
                    "cantidad": 1,
                    "medida": "unidad" // Pimiento verde
                  },
                  {
                    "IngredienteId": 14,
                    "cantidad": 1,
                    "medida": "unidad" // Pepino
                  },
                  {
                    "IngredienteId": 142,
                    "cantidad": 1,
                    "medida": "rebanada" // Pan
                  },
                  {
                    "IngredienteId": 147,
                    "cantidad": 1,
                    "medida": "taza" // Agua fría
                  },
                  {
                    "IngredienteId": 29,
                    "cantidad": 1,
                    "medida": "pizca" // Sal
                  }
                ],
                "procedimientos": [
                  {
                    "numero_procedimiento": 1,
                    "desc_procedimiento": "Pelar los tomates y cortarlos en trozos. Picar la cebolla, el ajo, el pimiento verde y el pepino.",
                    "foto_procedimiento": "gazpacho_paso1.jpg"
                  },
                  {
                    "numero_procedimiento": 2,
                    "desc_procedimiento": "En una licuadora o procesador de alimentos, mezclar los tomates, la cebolla, el ajo, el pimiento verde, el pepino, el pan, el aceite de oliva, el vinagre, el laurel, el romero y la sal. Mezclar hasta obtener una mezcla homogénea.",
                    "foto_procedimiento": "gazpacho_paso2.jpg"
                  },
                  {
                    "numero_procedimiento": 3,
                    "desc_procedimiento": "Agregar el agua fría y mezclar nuevamente hasta que todo esté bien incorporado y el gazpacho tenga la consistencia deseada.",
                    "foto_procedimiento": "gazpacho_paso3.jpg"
                  },
                  {
                    "numero_procedimiento": 4,
                    "desc_procedimiento": "Refrigerar el gazpacho durante al menos 1 hora antes de servir.",
                    "foto_procedimiento": "gazpacho_paso4.jpg"
                  },
                  {
                    "numero_procedimiento": 5,
                    "desc_procedimiento": "Servir frío y disfrutar de este delicioso gazpacho andaluz.",
                    "foto_procedimiento": "gazpacho_paso5.jpg"
                  }
                ]
              },
              {
                "nombre_receta": "Pulpo a la Gallega con Papas",
                "desc_receta": "Un plato típico de la región de Galicia, España, que consiste en pulpo cocido, papas y servido con aceite de oliva, pimentón y sal gruesa.",
                "persones": "4",
                "tiempo": "60 minutos",
                "dificultad": "Media",
                "tipo": "Entrante",
                "foto_receta": "pulpo_a_la_gallega_con_papas.jpg",
                "RestauranteId": 5,
                "TipoCocinaId": [1],
                "ingredientes": [
                  {
                    "IngredienteId": 96,
                    "cantidad": 1,
                    "medida": "pulpo" // Pulpo
                  },
                  {
                    "IngredienteId": 7,
                    "cantidad": 4,
                    "medida": "unidades pequeñas" // Papas
                  },
                  {
                    "IngredienteId": 1,
                    "cantidad": 4,
                    "medida": "cucharadas" // Aceite de oliva
                  },
                  {
                    "IngredienteId": 148,
                    "cantidad": 2,
                    "medida": "cucharaditas" // Pimentón dulce
                  },
                  {
                    "IngredienteId": 29,
                    "cantidad": 1,
                    "medida": "pizca" // Sal gruesa
                  }
                ],
                "procedimientos": [
                  {
                    "numero_procedimiento": 1,
                    "desc_procedimiento": "Lavar bien el pulpo bajo agua fría para quitar cualquier residuo.",
                    "foto_procedimiento": "pulpo_gallega_paso1.jpg"
                  },
                  {
                    "numero_procedimiento": 2,
                    "desc_procedimiento": "En una olla grande, llevar agua a ebullición. Sumergir el pulpo en el agua hirviendo y cocinar durante aproximadamente 40-50 minutos, hasta que esté tierno. El tiempo de cocción puede variar según el tamaño del pulpo.",
                    "foto_procedimiento": "pulpo_gallega_paso2.jpg"
                  },
                  {
                    "numero_procedimiento": 3,
                    "desc_procedimiento": "Mientras se cocina el pulpo, pelar las papas y cortarlas en rodajas gruesas.",
                    "foto_procedimiento": "pulpo_gallega_papas_paso3.jpg"
                  },
                  {
                    "numero_procedimiento": 4,
                    "desc_procedimiento": "Cocinar las papas en agua con sal hasta que estén tiernas pero firmes.",
                    "foto_procedimiento": "pulpo_gallega_papas_paso4.jpg"
                  },
                  {
                    "numero_procedimiento": 5,
                    "desc_procedimiento": "Una vez cocido, retirar el pulpo del agua y dejar enfriar unos minutos.",
                    "foto_procedimiento": "pulpo_gallega_paso3.jpg"
                  },
                  {
                    "numero_procedimiento": 6,
                    "desc_procedimiento": "Cortar el pulpo en rodajas de aproximadamente 1 centímetro de grosor y disponerlas en un plato junto con las papas.",
                    "foto_procedimiento": "pulpo_gallega_paso4.jpg"
                  },
                  {
                    "numero_procedimiento": 7,
                    "desc_procedimiento": "Rociar el pulpo y las papas con aceite de oliva y espolvorear con pimentón dulce y sal gruesa al gusto.",
                    "foto_procedimiento": "pulpo_gallega_paso5.jpg"
                  },
                  {
                    "numero_procedimiento": 8,
                    "desc_procedimiento": "Servir caliente y acompañar con pan crusty.",
                    "foto_procedimiento": "pulpo_gallega_paso6.jpg"
                  }
                ]
              },
              {
                "nombre_receta": "Cochinillo Asado",
                "desc_receta": "Una deliciosa especialidad de la cocina española, el cochinillo asado es un plato exquisito y tierno que se prepara tradicionalmente asando un lechón entero.",
                "persones": "6-8",
                "tiempo": "3-4 horas",
                "dificultad": "Alta",
                "tipo": "Principal",
                "foto_receta": "cochinillo_asado.jpg",
                "RestauranteId": 8,
                "TipoCocinaId": [1],
                "ingredientes": [
                  {
                    "IngredienteId": 149,
                    "cantidad": 1,
                    "medida": "lechón entero" // Cochinillo
                  },
                  {
                    "IngredienteId": 1,
                    "cantidad": 4,
                    "medida": "cucharadas" // Aceite de oliva
                  },
                  {
                    "IngredienteId": 2,
                    "cantidad": 4,
                    "medida": "dientes" // Ajo
                  },
                  {
                    "IngredienteId": 20,
                    "cantidad": 2,
                    "medida": "ramitas" // Romero fresco
                  },
                  {
                    "IngredienteId": 29,
                    "cantidad": 1,
                    "medida": "ramita" // Tomillo fresco
                  }
                ],
                "procedimientos": [
                  {
                    "numero_procedimiento": 1,
                    "desc_procedimiento": "Precalentar el horno a 180°C (350°F).",
                    "foto_procedimiento": "cochinillo_paso1.jpg"
                  },
                  {
                    "numero_procedimiento": 2,
                    "desc_procedimiento": "Lavar bien el lechón bajo agua fría y secarlo completamente con papel de cocina.",
                    "foto_procedimiento": "cochinillo_paso2.jpg"
                  },
                  {
                    "numero_procedimiento": 3,
                    "desc_procedimiento": "Hacer cortes poco profundos en la piel del lechón con un cuchillo afilado.",
                    "foto_procedimiento": "cochinillo_paso3.jpg"
                  },
                  {
                    "numero_procedimiento": 4,
                    "desc_procedimiento": "En un mortero, machacar los dientes de ajo con sal y las hierbas frescas hasta obtener una pasta.",
                    "foto_procedimiento": "cochinillo_paso4.jpg"
                  },
                  {
                    "numero_procedimiento": 5,
                    "desc_procedimiento": "Frotar la piel del lechón con la mezcla de ajo y hierbas, asegurándose de que penetre en los cortes.",
                    "foto_procedimiento": "cochinillo_paso5.jpg"
                  },
                  {
                    "numero_procedimiento": 6,
                    "desc_procedimiento": "Colocar el lechón en una bandeja para hornear y untar la piel con aceite de oliva.",
                    "foto_procedimiento": "cochinillo_paso6.jpg"
                  },
                  {
                    "numero_procedimiento": 7,
                    "desc_procedimiento": "Hornear el lechón durante 3-4 horas, rociándolo ocasionalmente con sus propios jugos, hasta que la piel esté crujiente y la carne tierna y jugosa.",
                    "foto_procedimiento": "cochinillo_paso7.jpg"
                  },
                  {
                    "numero_procedimiento": 8,
                    "desc_procedimiento": "Retirar el lechón del horno y dejar reposar unos minutos antes de cortarlo en porciones.",
                    "foto_procedimiento": "cochinillo_paso8.jpg"
                  },
                  {
                    "numero_procedimiento": 9,
                    "desc_procedimiento": "Servir caliente acompañado de guarniciones como papas asadas y ensalada verde.",
                    "foto_procedimiento": "cochinillo_paso9.jpg"
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
