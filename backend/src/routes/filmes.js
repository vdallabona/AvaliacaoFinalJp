const express = require('express')
const controllerFilmes = require('../controllers/filmes')
const auth = require("../middleware/auth")

const router = express.Router()

router.post('/', controllerFilmes.CreateFilme)
router.get('/', controllerFilmes.GetFilmes)
router.put('/:id', controllerFilmes.UpdateFilme)
router.delete('/:id', controllerFilmes.DeleteFilme)

module.exports = router