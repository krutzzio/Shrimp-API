
// Similar CRUD operations for Issue, User, Tag, and Comment...


const createItem = async (req,res,Model) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  const readItems = async (req,res,Model) => {
    try {
      const items = await Model.findAll();
      res.json(items);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  const readItemsForUser = async (req,res,Model) => {
    try {
      const items = await Model.findAll({where: {userId: req.userId}});
      res.json(items);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  const readItem = async (req,res,Model) => {
    try {
      const item = await Model.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  
  const readItemForUser = async (req,res,Model) => {
    try {
      if (!req.userId) {
        return res.status(404).json({ error: 'Unathorized' });
      }
      const item = await Model.findOne({where: {id: req.params.id, userId: req.userId}});
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  
  const updateItem = async (req,res,Model) => {
    try {
      const item = await Model.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      await item.update(req.body);
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  const deleteItem = async (req,res,Model) => {
    try {
      const item = await Model.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      await item.destroy();
      res.json({message: 'Project deleted successfully'});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  

  const updateRestItem = async (req, res, Model, restauranteId, recetaId) => {
    try {
      const item = await Model.findByPk(recetaId);
      if (!item) {
        return res.status(404).json({ error: 'Receta not found' });
      }
  
      // Verificar si la receta pertenece al restaurante
      if (item.RestauranteId !== restauranteId) {
        return res.status(403).json({ error: 'Receta does not belong to this restaurante' });
      }
  
      await item.update(req.body);
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const deleteItemForUser = async (req,res,Model) => {
    try {
      if (!req.userId) {
        return res.status(404).json({ error: 'Unathorized' });
      }
      const item = await Model.findOne({where: {id: req.params.id, userId: req.userId}});
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      await item.destroy();
      res.json({message: 'Project deleted successfully'});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  
  module.exports = {
    updateRestItem,
    createItem,
    updateItem,
    deleteItem,
    readItem,
    readItems,
    readItemsForUser,
    readItemForUser,
    deleteItemForUser
  }  