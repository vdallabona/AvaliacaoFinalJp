const express = require('express')
const controllerFilmesLocados = require('../controllers/filmeslocados')
const auth = require("../middleware/auth")

const router = express.Router()

router.post('/', auth, controllerFilmesLocados.CreateLocacao)
router.put('/:id', auth, controllerFilmesLocados.Decolucao)
router.get('/', auth, controllerFilmesLocados.GetFilmesLocados)

module.exports = router