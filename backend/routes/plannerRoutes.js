const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannerController');

router.get('/', plannerController.getAll);
router.get('/:id', plannerController.getById);
router.post('/', plannerController.create);
router.put('/:id', plannerController.update);
router.delete('/:id', plannerController.delete);
router.get('/search', plannerController.search);

// Dropdown data
router.get('/dropdown/funds', plannerController.getAllFunds);
router.get('/dropdown/sources', plannerController.getAllSources);
router.get('/dropdown/runs', plannerController.getAllRuns);
router.get('/dropdown/reports', plannerController.getAllReports);

module.exports = router;