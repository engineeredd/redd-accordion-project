const express = require('express');
const router = express.Router();
const externalSystemController = require('../controllers/externalSystemController');

router.get('/', externalSystemController.getAll);
router.get('/:id', externalSystemController.getById);
router.post('/', externalSystemController.create);
router.put('/:id', externalSystemController.update);
router.delete('/:id', externalSystemController.delete);
router.get('/search', externalSystemController.search);

module.exports = router;