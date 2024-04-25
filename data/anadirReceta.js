

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
                "nombre_receta": "Pollo Tikka Masala",
                "desc_receta": "Un plato clásico de la cocina india con pollo en una deliciosa salsa cremosa de tomate y especias",
                "personas": "4",
                "tiempo": "45 minutos",
                "dificultad": "Media",
                "tipo": "Segundo",
                "foto_receta": "receta2.jpg",
                "RestauranteId": 7,
                "TipoCocinaId": [4],
                ingredientes: [
                    {
                        "IngredienteId": 67,
                        "cantidad": 500,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 58,
                        "cantidad": 150,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 68,
                        "cantidad": 1,
                        "medida": "cucharada"
                    },
                    {
                        "IngredienteId": 2,
                        "cantidad": 3,
                        "medida": "dientes"
                    },
                    {
                        "IngredienteId": 69,
                        "cantidad": 1,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": 70,
                        "cantidad": 1,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": 71,
                        "cantidad": 1,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": 24,
                        "cantidad": 0.5,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": 72,
                        "cantidad": 400,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 73,
                        "cantidad": 200,
                        "medida": "mililitros"
                    },
                    {
                        "IngredienteId": 18,
                        "cantidad": 10,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 74,
                        "cantidad": 300,
                        "medida": "gramos"
                    }
                ],
                "procedimientos": [
                    {
                        "numero_procedimiento": 1,
                        "desc_procedimiento": "Cortar las pechugas de pollo en trozos y marinar con yogur, jengibre rallado, ajo picado, cúrcuma, comino, pimentón y canela. Dejar reposar al menos 30 minutos.",
                        "foto_procedimiento": "procedimiento1.jpg"
                    },
                    {
                        "numero_procedimiento": 2,
                        "desc_procedimiento": "Cocinar el pollo marinado en una sartén caliente hasta que esté dorado por fuera y cocido por dentro. Reservar.",
                        "foto_procedimiento": "procedimiento2.jpg"
                    },
                    {
                        "numero_procedimiento": 3,
                        "desc_procedimiento": "En la misma sartén, agregar un poco más de aceite si es necesario y saltear el tomate triturado hasta que reduzca y espese ligeramente.",
                        "foto_procedimiento": "procedimiento3.jpg"
                    },
                    {
                        "numero_procedimiento": 4,
                        "desc_procedimiento": "Añadir la crema de coco a la salsa de tomate y mezclar bien. Cocinar a fuego lento durante unos minutos.",
                        "foto_procedimiento": "procedimiento1.jpg"
                    },
                    {
                        "numero_procedimiento": 5,
                        "desc_procedimiento": "Incorporar el pollo cocido a la salsa y calentar todo junto. Espolvorear con cilantro fresco picado antes de servir. Acompañar con arroz basmati cocido.",
                        "foto_procedimiento": "procedimiento2.jpg"
                    }
                ]
            },
            {
                "nombre_receta": "Curry de Garbanzos",
                "desc_receta": "Un delicioso plato vegetariano con garbanzos en una salsa aromática de curry",
                "personas": "4",
                "tiempo": "40 minutos",
                "dificultad": "Fácil",
                "tipo": "Principal",
                "foto_receta": "curry_garbanzos.jpg",
                "RestauranteId": 9,
                "TipoCocinaId": [4],
                ingredientes: [
                    {
                        "IngredienteId": 48,
                        "cantidad": 400,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 3,
                        "cantidad": 1,
                        "medida": "unidad"
                    },
                    {
                        "IngredienteId": 5,
                        "cantidad": 2,
                        "medida": "unidad"
                    },
                    {
                        "IngredienteId": 68,
                        "cantidad": 1,
                        "medida": "cucharada"
                    },
                    {
                        "IngredienteId": 2,
                        "cantidad": 3,
                        "medida": "dientes"
                    },
                    {
                        "IngredienteId": 75,
                        "cantidad": 2,
                        "medida": "cucharaditas"
                    },
                    {
                        "IngredienteId": 76,
                        "cantidad": 200,
                        "medida": "mililitros"
                    },
                    {
                        "IngredienteId": 18,
                        "cantidad": 10,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 74,
                        "cantidad": 300,
                        "medida": "gramos"
                    }
                ],
                procedimientos: [
                    {
                        "numero_procedimiento": 1,
                        "desc_procedimiento": "Picar la cebolla, los tomates, el jengibre y el ajo finamente.",
                        "foto_procedimiento": "procedimiento1.jpg"
                    },
                    {
                        "numero_procedimiento": 2,
                        "desc_procedimiento": "En una sartén grande, saltear la cebolla, el jengibre y el ajo hasta que estén dorados.",
                        "foto_procedimiento": "procedimiento1.jpg"
                    },
                    {
                        "numero_procedimiento": 3,
                        "desc_procedimiento": "Agregar los tomates picados y cocinar hasta que se deshagan.",
                        "foto_procedimiento": "procedimiento1.jpg"
                    },
                    {
                        "numero_procedimiento": 4,
                        "desc_procedimiento": "Añadir el curry en polvo y cocinar por unos minutos.",
                        "foto_procedimiento": "procedimiento1.jpg"
                    },
                    {
                        "numero_procedimiento": 5,
                        "desc_procedimiento": "Incorporar los garbanzos cocidos y la leche de coco. Cocinar a fuego lento hasta que la salsa espese.",
                        "foto_procedimiento": "procedimiento1.jpg"
                    },
                    {
                        "numero_procedimiento": 6,
                        "desc_procedimiento": "Servir caliente, espolvoreado con cilantro fresco picado, acompañado de arroz basmati cocido.",
                        "foto_procedimiento": "procedimiento1.jpg"
                    }
                ]
            },
            {
                "nombre_receta": "Sopa de Lentejas",
                "desc_receta": "Una reconfortante sopa vegana llena de sabor y nutrientes",
                "personas": "6",
                "tiempo": "50 minutos",
                "dificultad": "Fácil",
                "tipo": "Principal",
                "foto_receta": "sopa_lentejas.jpg",
                "RestauranteId": 12,
                "TipoCocinaId": [9],
                ingredientes: [
                    {
                        "IngredienteId": 47,
                        "cantidad": 250,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 6,
                        "cantidad": 2,
                        "medida": "unidades"
                    },
                    {
                        "IngredienteId": 3,
                        "cantidad": 1,
                        "medida": "unidad"
                    },
                    {
                        "IngredienteId": 64,
                        "cantidad": 2,
                        "medida": "tallos"
                    },
                    {
                        "IngredienteId": 5,
                        "cantidad": 2,
                        "medida": "unidades"
                    },
                    {
                        "IngredienteId": 77,
                        "cantidad": 1,
                        "medida": "litro"
                    },
                    {
                        "IngredienteId": 2,
                        "cantidad": 3,
                        "medida": "dientes"
                    },
                    {
                        "IngredienteId": 78,
                        "cantidad": 1,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": 70,
                        "cantidad": 1,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": 1,
                        "cantidad": 2,
                        "medida": "cucharadas"
                    },
                    {
                        "IngredienteId": 29,
                        "cantidad": 1,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": 27,
                        "cantidad": 0.5,
                        "medida": "cucharadita"
                    }
                ],
                procedimientos: [
                    {
                        "numero_procedimiento": 1,
                        "desc_procedimiento": "Picar finamente la cebolla, el apio, las zanahorias, el ajo y los tomates.",
                        "foto_procedimiento": "sopa_lentejas_proceso1.jpg"
                    },
                    {
                        "numero_procedimiento": 2,
                        "desc_procedimiento": "En una olla grande, calentar el aceite de oliva y saltear la cebolla, el apio y las zanahorias hasta que estén tiernos.",
                        "foto_procedimiento": "sopa_lentejas_proceso2.jpg"
                    },
                    {
                        "numero_procedimiento": 3,
                        "desc_procedimiento": "Agregar el ajo picado, el pimentón dulce y el comino molido. Cocinar por unos minutos hasta que el ajo esté fragante.",
                        "foto_procedimiento": "sopa_lentejas_proceso3.jpg"
                    },
                    {
                        "numero_procedimiento": 4,
                        "desc_procedimiento": "Añadir los tomates picados y cocinar hasta que se deshagan.",
                        "foto_procedimiento": "sopa_lentejas_proceso4.jpg"
                    },
                    {
                        "numero_procedimiento": 5,
                        "desc_procedimiento": "Agregar las lentejas y el caldo de verduras. Dejar cocinar a fuego lento hasta que las lentejas estén tiernas, aproximadamente 30-40 minutos.",
                        "foto_procedimiento": "sopa_lentejas_proceso5.jpg"
                    },
                    {
                        "numero_procedimiento": 6,
                        "desc_procedimiento": "Sazonar con sal y pimienta al gusto. Servir caliente, acompañado de pan crujiente.",
                        "foto_procedimiento": "sopa_lentejas_proceso6.jpg"
                    }
                ]
            },
            {
                "nombre_receta": "Tortilla de Espinacas y Queso",
                "desc_receta": "Una deliciosa tortilla española vegetariana con espinacas frescas y queso derretido",
                "personas": "4",
                "tiempo": "30 minutos",
                "dificultad": "Fácil",
                "tipo": "Principal",
                "foto_receta": "tortilla_espinacas_queso.jpg",
                "RestauranteId": 14,
                "TipoCocinaId": [9],
                ingredientes: [
                    {
                        "IngredienteId": 56,
                        "cantidad": 6,
                        "medida": "unidades"
                    },
                    {
                        "IngredienteId": 11,
                        "cantidad": 200,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 79,
                        "cantidad": 100,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 3,
                        "cantidad": 1,
                        "medida": "unidad"
                    },
                    {
                        "IngredienteId": 1,
                        "cantidad": 2,
                        "medida": "cucharadas"
                    },
                    {
                        "IngredienteId": 29,
                        "cantidad": 1,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": 27,
                        "cantidad": 0.5,
                        "medida": "cucharadita"
                    }
                ],
                procedimientos: [
                    {
                        "numero_procedimiento": 1,
                        "desc_procedimiento": "Lavar y picar finamente las espinacas frescas y la cebolla.",
                        "foto_procedimiento": "tortilla_espinacas_queso_proceso1.jpg"
                    },
                    {
                        "numero_procedimiento": 2,
                        "desc_procedimiento": "En una sartén grande, calentar el aceite de oliva y saltear la cebolla hasta que esté transparente.",
                        "foto_procedimiento": "tortilla_espinacas_queso_proceso2.jpg"
                    },
                    {
                        "numero_procedimiento": 3,
                        "desc_procedimiento": "Agregar las espinacas picadas a la sartén y cocinar hasta que se marchiten.",
                        "foto_procedimiento": "tortilla_espinacas_queso_proceso3.jpg"
                    },
                    {
                        "numero_procedimiento": 4,
                        "desc_procedimiento": "Batir los huevos en un tazón grande y añadir las espinacas cocidas, el queso rallado, la sal y la pimienta.",
                        "foto_procedimiento": "tortilla_espinacas_queso_proceso4.jpg"
                    },
                    {
                        "numero_procedimiento": 5,
                        "desc_procedimiento": "Verter la mezcla de huevos en una sartén caliente y cocinar a fuego medio-bajo hasta que la tortilla esté dorada por ambos lados y el queso se haya derretido por dentro.",
                        "foto_procedimiento": "tortilla_espinacas_queso_proceso5.jpg"
                    },
                    {
                        "numero_procedimiento": 6,
                        "desc_procedimiento": "Servir caliente, cortada en porciones, y disfrutar como plato principal o acompañamiento.",
                        "foto_procedimiento": "tortilla_espinacas_queso_proceso6.jpg"
                    }
                ]
            },
            {
                "nombre_receta": "Cuscús de Verduras",
                "desc_receta": "Un plato clásico de la cocina marroquí, cuscús con una variedad de verduras sazonadas con especias aromáticas",
                "personas": "6",
                "tiempo": "40 minutos",
                "dificultad": "Media",
                "tipo": "Principal",
                "foto_receta": "cuscus_verduras.jpg",
                "RestauranteId": 18,
                "TipoCocinaId": [8],
                ingredientes: [
                    {
                        "IngredienteId": 80,
                        "cantidad": 300,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 6,
                        "cantidad": 2,
                        "medida": "unidades"
                    },
                    {
                        "IngredienteId": 81,
                        "cantidad": 1,
                        "medida": "unidad"
                    },
                    {
                        "IngredienteId": 82,
                        "cantidad": 1,
                        "medida": "unidad"
                    },
                    {
                        "IngredienteId": 3,
                        "cantidad": 1,
                        "medida": "unidad"
                    },
                    {
                        "IngredienteId": 5,
                        "cantidad": 2,
                        "medida": "unidades"
                    },
                    {
                        "IngredienteId": 77,
                        "cantidad": 500,
                        "medida": "mililitros"
                    },
                    {
                        "IngredienteId": 83,
                        "cantidad": 50,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 84,
                        "cantidad": 50,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": 1,
                        "cantidad": 2,
                        "medida": "cucharadas"
                    },
                    {
                        "IngredienteId": 69,
                        "cantidad": 1,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": 70,
                        "cantidad": 1,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": 24,
                        "cantidad": 0.5,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": 29,
                        "cantidad": 1,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": 27,
                        "cantidad": 0.5,
                        "medida": "cucharadita"
                    }
                ],
                procedimientos: [
                    {
                        "numero_procedimiento": 1,
                        "desc_procedimiento": "Picar finamente la cebolla, las zanahorias, el calabacín, el pimiento rojo y los tomates.",
                        "foto_procedimiento": "cuscus_verduras_proceso1.jpg"
                    },
                    {
                        "numero_procedimiento": 2,
                        "desc_procedimiento": "En una olla grande, calentar el aceite de oliva y saltear la cebolla hasta que esté transparente.",
                        "foto_procedimiento": "cuscus_verduras_proceso2.jpg"
                    },
                    {
                        "numero_procedimiento": 3,
                        "desc_procedimiento": "Agregar las zanahorias, el calabacín y el pimiento rojo picados. Cocinar por unos minutos hasta que estén tiernos.",
                        "foto_procedimiento": "cuscus_verduras_proceso3.jpg"
                    },
                    {
                        "numero_procedimiento": 4,
                        "desc_procedimiento": "Añadir los tomates picados, las pasas y las almendras. Cocinar por unos minutos más.",
                        "foto_procedimiento": "cuscus_verduras_proceso4.jpg"
                    },
                    {
                        "numero_procedimiento": 5,
                        "desc_procedimiento": "Agregar el cúrcuma, el comino, la canela, la sal y la pimienta. Mezclar bien.",
                        "foto_procedimiento": "cuscus_verduras_proceso5.jpg"
                    },
                    {
                        "numero_procedimiento": 6,
                        "desc_procedimiento": "Agregar el caldo de verduras y llevar a ebullición. Luego, añadir el cuscús y remover. Tapar la olla y dejar reposar fuera del fuego durante 10 minutos.",
                        "foto_procedimiento": "cuscus_verduras_proceso6.jpg"
                    },
                    {
                        "numero_procedimiento": 7,
                        "desc_procedimiento": "Servir el cuscús de verduras caliente, acompañado de pan marroquí si se desea.",
                        "foto_procedimiento": "cuscus_verduras_proceso7.jpg"
                    }
                ]
            }, {
                "nombre_receta": "Costillas a la Barbacoa",
                "desc_receta": "Costillas de cerdo glaseadas con una sabrosa salsa barbacoa casera, perfectas para una comida reconfortante y llena de sabor",
                "personas": "4",
                "tiempo": "3 horas",
                "dificultad": "Media",
                "tipo": "Principal",
                "foto_receta": "costillas_barbacoa.jpg",
                "RestauranteId": 15,
                "TipoCocinaId": [1],
                ingredientes: [
                    {
                        "IngredienteId": "Costillas de cerdo",
                        "cantidad": 1.5,
                        "medida": "kilogramo"
                    },
                    {
                        "IngredienteId": "Salsa barbacoa",
                        "cantidad": 300,
                        "medida": "mililitros"
                    },
                    {
                        "IngredienteId": "Vinagre de manzana",
                        "cantidad": 50,
                        "medida": "mililitros"
                    },
                    {
                        "IngredienteId": "Azúcar moreno",
                        "cantidad": 50,
                        "medida": "gramos"
                    },
                    {
                        "IngredienteId": "Pimentón dulce",
                        "cantidad": 2,
                        "medida": "cucharaditas"
                    },
                    {
                        "IngredienteId": "Ajo en polvo",
                        "cantidad": 1,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": "Sal",
                        "cantidad": 1,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": "Pimienta negra",
                        "cantidad": 0.5,
                        "medida": "cucharadita"
                    },
                    {
                        "IngredienteId": "Aceite de oliva",
                        "cantidad": 2,
                        "medida": "cucharadas"
                    }
                ],
                procedimientos: [
                    {
                        "numero_procedimiento": 1,
                        "desc_procedimiento": "Precalentar el horno a 150°C (300°F).",
                        "foto_procedimiento": "costillas_barbacoa_proceso1.jpg"
                    },
                    {
                        "numero_procedimiento": 2,
                        "desc_procedimiento": "En un tazón, mezclar la salsa barbacoa, el vinagre de manzana, el azúcar moreno, el pimentón dulce, el ajo en polvo, la sal y la pimienta negra para hacer el glaseado.",
                        "foto_procedimiento": "costillas_barbacoa_proceso2.jpg"
                    },
                    {
                        "numero_procedimiento": 3,
                        "desc_procedimiento": "Colocar las costillas en una bandeja para hornear y untarlas generosamente con el glaseado por todos lados.",
                        "foto_procedimiento": "costillas_barbacoa_proceso3.jpg"
                    },
                    {
                        "numero_procedimiento": 4,
                        "desc_procedimiento": "Cubrir la bandeja con papel de aluminio y hornear durante aproximadamente 2 horas, o hasta que las costillas estén tiernas.",
                        "foto_procedimiento": "costillas_barbacoa_proceso4.jpg"
                    },
                    {
                        "numero_procedimiento": 5,
                        "desc_procedimiento": "Retirar el papel de aluminio y aumentar la temperatura del horno a 200°C (400°F). Pincelar las costillas con más glaseado y hornear durante 15-20 minutos más, hasta que estén caramelizadas y doradas.",
                        "foto_procedimiento": "costillas_barbacoa_proceso5.jpg"
                    },
                    {
                        "numero_procedimiento": 6,
                        "desc_procedimiento": "Servir las costillas a la barbacoa caliente, acompañadas de ensalada de col y pan de maíz.",
                        "foto_procedimiento": "costillas_barbacoa_proceso6.jpg"
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
