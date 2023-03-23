const express = require('express')
const router = express.Router();
const { getAutos, setAutos, updateAutos, deleteAutos} = require('../controllers/autoController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getAutos)
router.post('/', protect, setAutos)
router.put('/:id', protect, updateAutos)
router.delete('/:id', protect, deleteAutos)

module.exports = router;
