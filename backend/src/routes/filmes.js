const express = require('express')
const controllerFilmes = require('../controllers/filmes')
const auth = require("../middleware/auth")

const router = express.Router()

router.get('/', controllerFilmes.GetFilmes)
router.post('/', auth, controllerFilmes.CreateFilme)
router.put('/:id', auth, controllerFilmes.UpdateFilme)
router.delete('/:id', auth, controllerFilmes.DeleteFilme)

module.exports = router