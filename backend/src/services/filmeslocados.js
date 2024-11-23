const ModelFilmesLocados = require('../models/filmeslocados')

class ServiceFilmesLocados {
    async GetFilmesLocados() {
        return ModelFilmesLocados.findAll()
    }
    async CreateLocacao(filmes_id, clientes_id, dataLocacao) {
        if(!filmes_id || !clientes_id || !dataLocacao){
            throw new Error("Favor preencher todos os dados da locação!")
        }
        return ModelFilmesLocados.create({ filmes_id, clientes_id, dataLocacao})
    }

    async Decolucao(id, dataDevolucao) {
        if(!id || !dataDevolucao) {
            throw new Error("Favor informar o Id e a data de devolução")
        }
        const filmeslocados = await ModelFilmesLocados.findByPk(id)
        if(!filmeslocados) {
            throw new Error("Filme locado não encontrado")
        }
        filmeslocados.dataDevolucao = dataDevolucao

        filmeslocados.save()
        return filmeslocados
    }
}
module.exports = new ServiceFilmesLocados()