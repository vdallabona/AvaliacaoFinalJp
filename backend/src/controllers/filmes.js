const ServiceFilme = require('../services/filmes')
class ControllerFilme {

    async GetFilmes(req, res) {
        try {
            const clientes = await ServiceFilme.GetFilmes()
            res.send({ msg: clientes })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async CreateFilme(req,res){
        try {
            const { titulo, faixaEtaria, diretor } = req.body

            const filme = await ServiceFilme
                .CreateFilme(titulo, faixaEtaria, diretor)
            res.send({ msg: filme })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async UpdateFilme(req,res){
        try {
            const id = req.params.id
            const titulo = req.body.titulo
            const faixaEtaria = req.body.faixaEtaria
            const diretor = req.body.diretor

            const filme = await ServiceFilme
                .UpdateFilme(id, titulo, faixaEtaria, diretor)

            res.send({ msg: filme })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async DeleteFilme(req,res){
        try {
            const id = req.params.id
            await ServiceFilme.DeleteFilme(id)
            res.status(204).send()
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new ControllerFilme()