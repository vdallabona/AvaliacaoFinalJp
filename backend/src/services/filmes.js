const ModelFilme = require('../models/filmes')
const ModelFilmesLocados = require('../models/filmeslocados')


class ServiceFilme {
    async GetFilmeById(id) {
        return ModelFilme.findByPk(id)
    }
    async GetFilmes() {
        return ModelFilme.findAll()
    }
    async CreateFilme(titulo, faixaEtaria, diretor) {
        if(!titulo || !diretor || !faixaEtaria){
            throw new Error("Favor preencher todos os dados do filme!")
        }
        return ModelFilme.create({ titulo, faixaEtaria, diretor})
    }
    async UpdateFilme(id, titulo, faixaEtaria, diretor) {
        if(!id) {
            throw new Error("Favor informar o Id")
        }
        const filme = await ModelFilme.findByPk(id)
        if(!filme) {
            throw new Error("Filme não encontrado")
        }
        filme.titulo = titulo || filme.titulo
        filme.diretor = diretor || filme.diretor
        filme.faixaEtaria = faixaEtaria || filme.faixaEtaria

        filme.save()
        return filme
    }
    async DeleteFilme(id) {
        if(!id) {
            throw new Error("Favor informar o Id")
        }
        const filme = await ModelFilme.findByPk(id)
        if(!filme) {
            throw new Error("Filme não encontrado")
        }
        return filme.destroy()
    }

    async GetFilmesLocados() {
        return ModelFilmesLocados.findAll({
            where:{
                dataDevolucao: null
            },
            include: [
                {
                    model: require('../models/clientes'),
                    as: 'cliente',
                    attributes: ['name']
                },
                {
                    model: require('../models/filmes'),
                    as: 'filme',
                    attributes: ['titulo']
                }
            ]
        })
    }
    async CreateLocacao(filmes_id, clientes_id, dataLocacao) {
        if(!filmes_id || !clientes_id || !dataLocacao){
            throw new Error("Favor preencher todos os dados da locação!")
        }

        const filmeslocados = await ModelFilmesLocados.findAll({
            where:{
                dataDevolucao: null,
                filmes_id: filmes_id
            }
        })
        if (filmeslocados != ""){
            throw new Error("Esse filme não está disponível para locação")
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
module.exports = new ServiceFilme()