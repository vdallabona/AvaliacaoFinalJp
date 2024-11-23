const ServiceCliente = require('../services/clientes')
class ControllerCliente {

    async GetClientes(req, res) {
        try {
            const clientes = await ServiceCliente.GetClientes()
            res.send({ msg: clientes })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async CreateCliente(req,res){
        try {
            const { name, email, senha } = req.body

            const cliente = await ServiceCliente
                .CreateCliente(name, email, senha)
            res.send({ msg: cliente })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async UpdateCliente(req,res){
        try {
            const id = req.params.id
            const name = req.body.name
            const email = req.body.email
            const senha = req.body.senha

            const cliente = await ServiceCliente
                .UpdateCliente(id, name, email, senha)

            res.send({ msg: cliente })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async DeleteCliente(req,res){
        try {
            const id = req.params.id
            await ServiceCliente.DeleteCliente(id)
            res.status(204).send()
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async Login(req, res) {
        try {
            const { email, senha } = req.body
            const token = await ServiceCliente.Login(email, senha)
            res.status(200).send({ token })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new ControllerCliente()