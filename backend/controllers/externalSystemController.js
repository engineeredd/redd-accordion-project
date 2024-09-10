const { ExternalSystem } = require('../models');

// Get all external systems
exports.getAll = async (req, res) => {
  try {
    const systems = await ExternalSystem.findAll();
    res.json(systems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get external system by ID
exports.getById = async (req, res) => {
  try {
    const system = await ExternalSystem.findByPk(req.params.id);
    if (system) {
      res.json(system);
    } else {
      res.status(404).json({ message: 'External System not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new external system
exports.create = async (req, res) => {
  try {
    const system = await ExternalSystem.create(req.body);
    res.status(201).json(system);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an external system
exports.update = async (req, res) => {
  try {
    const system = await ExternalSystem.findByPk(req.params.id);
    if (system) {
      await system.update(req.body);
      res.json(system);
    } else {
      res.status(404).json({ message: 'External System not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an external system
exports.delete = async (req, res) => {
  try {
    const system = await ExternalSystem.findByPk(req.params.id);
    if (system) {
      await system.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'External System not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search external systems by name
exports.search = async (req, res) => {
  try {
    const systems = await ExternalSystem.findAll({
      where: {
        name: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }
    });
    res.json(systems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};