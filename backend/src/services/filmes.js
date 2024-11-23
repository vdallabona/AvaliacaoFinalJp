const ModelFilme = require('../models/filmes')

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
}
module.exports = new ServiceFilme()