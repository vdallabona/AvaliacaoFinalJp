const express = require('express')
const controllerFilmes = require('../controllers/filmes')
const controllerFilmesLocados = require('../controllers/filmeslocados')
const auth = require("../middleware/auth")

const router = express.Router()

router.get('/', controllerFilmes.GetFilmes)
router.post('/', auth, controllerFilmes.CreateFilme)
router.put('/:id', auth, controllerFilmes.UpdateFilme)
router.delete('/:id', auth, controllerFilmes.DeleteFilme)

router.post('/locar', auth, controllerFilmesLocados.CreateLocacao)
router.put('/devolver/:id', auth, controllerFilmesLocados.Decolucao)
router.get('/filmeslocados', auth, controllerFilmesLocados.GetFilmesLocados)

module.exports = router