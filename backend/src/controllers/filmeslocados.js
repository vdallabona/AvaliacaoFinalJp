const ServiceFilmesLocados = require('../services/filmeslocados')
class controllerFilmesLocados {

    async GetFilmesLocados(req, res) {
        try {
            const locacao = await ServiceFilmesLocados.GetFilmesLocados()
            res.send({ msg: locacao })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async CreateLocacao(req,res){
        try {
            const { filmes_id, clientes_id, dataLocacao } = req.body

            const locacao = await ServiceFilmesLocados
                .CreateLocacao(filmes_id, clientes_id, dataLocacao)
            res.send({ msg: locacao })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }

    async Decolucao(req,res){
        try {
            const id = req.params.id
            const dataDevolucao = req.body.dataDevolucao

            const filme = await ServiceFilmesLocados
                .Decolucao(id, dataDevolucao)

            res.send({ msg: filme })
        } catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
}

module.exports = new controllerFilmesLocados()