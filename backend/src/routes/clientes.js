const express = require('express')
const controllerClientes = require('../controllers/clientes')
const auth = require("../middleware/auth")

const router = express.Router()

router.post('/', controllerClientes.CreateCliente)
router.post('/login', controllerClientes.Login)

router.get('/', auth, controllerClientes.GetClientes)
router.put('/:id', auth, controllerClientes.UpdateCliente)
router.delete('/:id', auth, controllerClientes.DeleteCliente)

module.exports = router