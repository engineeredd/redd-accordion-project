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
router.get('/funds', plannerController.getAllFunds);
router.get('/sources', plannerController.getAllSources);
router.get('/runs', plannerController.getAllRuns);
router.get('/reports', plannerController.getAllReports);

module.exports = router;