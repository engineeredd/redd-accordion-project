const { Planner, ExternalSystem, Fund, Source, Run, Report } = require('../models');

// Get all planners
exports.getAll = async (req, res) => {
  try {
    const planners = await Planner.findAll({
      include: [{ model: ExternalSystem }]
    });
    res.json(planners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get planner by ID
exports.getById = async (req, res) => {
  try {
    const planner = await Planner.findByPk(req.params.id, {
      include: [{ model: ExternalSystem }]
    });
    if (planner) {
      res.json(planner);
    } else {
      res.status(404).json({ message: 'Planner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new planner
exports.create = async (req, res) => {
  try {
    const planner = await Planner.create(req.body);
    res.status(201).json(planner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a planner
exports.update = async (req, res) => {
  try {
    const planner = await Planner.findByPk(req.params.id);
    if (planner) {
      await planner.update(req.body);
      res.json(planner);
    } else {
      res.status(404).json({ message: 'Planner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a planner
exports.delete = async (req, res) => {
  try {
    const planner = await Planner.findByPk(req.params.id);
    if (planner) {
      await planner.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Planner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search planners by name
exports.search = async (req, res) => {
  try {
    const planners = await Planner.findAll({
      where: {
        name: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }
    });
    res.json(planners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dropdown data
exports.getAllFunds = async (req, res) => {
	try {
		const funds = await Fund.findAll();
		res.json(funds);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getAllSources = async (req, res) => {
	try {
		const sources = await Source.findAll();
		res.json(sources);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getAllRuns = async (req, res) => {
	try {
		const runs = await Run.findAll();
		res.json(runs);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};