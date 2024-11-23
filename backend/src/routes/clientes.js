const express = require('express')
const controllerClientes = require('../controllers/clientes')
const auth = require("../middleware/auth")

const router = express.Router()

router.post('/', controllerClientes.CreateCliente)
router.get('/', controllerClientes.GetClientes)
router.put('/:id', controllerClientes.UpdateCliente)
router.delete('/:id', controllerClientes.DeleteCliente)

module.exports = router