// Filmes_Locados: id, idFilme, idCliente, dataLocacao, dataDevolucao.

const database = require('../config/database')
const ModelCliente = require('../models/clientes')
const ModelFilmes = require('../models/filmes')
class ModelFilmesLocados {
    constructor() {
        this.model = database.db.define('filmeslocados', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            filmes_id: {
                type: database.db.Sequelize.INTEGER,
                references: {
                  model: ModelFilmes,
                  key: 'id',
                },
              },
            clientes_id: {
                type: database.db.Sequelize.INTEGER,
                references: {
                  model: ModelCliente,
                  key: 'id',
                },
              },
            dataLocacao: {
                type: database.db.Sequelize.DATEONLY
            },
            dataDevolucao: {
                type: database.db.Sequelize.DATEONLY
            }
        })
        this.model.belongsTo(ModelCliente, { foreignKey: 'clientes_id', as: 'cliente' });
        this.model.belongsTo(ModelFilmes, { foreignKey: 'filmes_id', as: 'filme' });
    }
}
module.exports = new ModelFilmesLocados().model