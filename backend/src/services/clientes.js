const ModelCliente = require('../models/clientes')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT = 12

class ServiceClientes {
    async GetClienteById(id) {
        return ModelCliente.findByPk(id)
    }
    async GetClientes() {
        return ModelCliente.findAll()
    }
    async CreateCliente(name, email, senha,) {
        if(!name || !senha || !email){
            throw new Error("Favor preencher todos os dados!")
        }
        if(name === "deletado"){
            throw new Error("Nome indisponível")
        }
        const hashSenha = await bcrypt.hash(senha, SALT)
        return ModelCliente.create({ name, senha: hashSenha, email })
    }
    async UpdateCliente(id, name,  email, senha) {
        if(!id) {
            throw new Error("Favor informar o Id")
        }
        if(name === "deletado"){
            throw new Error("Nome indisponível")
        }
        const cliente = await ModelCliente.findByPk(id)
        if(!cliente) {
            throw new Error("Cliente não encontrado")
        }
        cliente.name = name || cliente.name
        cliente.email = email || cliente.email
        cliente.senha = senha
            ? await bcrypt.hash(senha, SALT)
            : cliente.senha

        cliente.save()
        return cliente
    }
    async DeleteCliente(id) {
        if(!id) {
            throw new Error("Favor informar o Id")
        }
        const cliente = await ModelCliente.findByPk(id)
        if(!cliente) {
            throw new Error("Cliente não encontrada")
        }
        cliente.name = "deletado"
        cliente.email = "deletado"
        cliente.senha = ""
        cliente.save()
        return cliente
    }

    async Login(email, senha) {
        if(!email || !senha) {
            throw new Error("Email ou senha inválido!")
        }
        if(email === "deletado"){
            throw new Error("Email ou senha inválido!")
        }

        const cliente = await ModelCliente.findOne({ where: { email } })

        if(!cliente) {
            throw new Error("Email ou senha inválido!")
        }

        const senhaValida = bcrypt.compare(senha, cliente.senha)

        if(!senhaValida) {
            throw new Error("Email ou senha inválido!")
        }

        return jwt.sign({ id: cliente.id }, 'segredo', { expiresIn: 60 * 60 })
    }
}
module.exports = new ServiceClientes()