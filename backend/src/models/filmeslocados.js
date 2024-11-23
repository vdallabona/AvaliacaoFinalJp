// Filmes_Locados: id, idFilme, idCliente, dataLocacao, dataDevolucao.

const database = require('../config/database')

class ModelFilmesLocados {
    constructor() {
        this.model = database.db.define('filmeslocados', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            idFilme: {
                type: database.db.Sequelize.INTEGER
            },
            idCliente: {
                type: database.db.Sequelize.INTEGER
            },
            dataLocacao: {
                type: database.db.Sequelize.DATEONLY
            },
            dataDevolucao: {
                type: database.db.Sequelize.DATEONLY
            }
        })
    }
}
module.exports = new ModelFilmesLocados().model