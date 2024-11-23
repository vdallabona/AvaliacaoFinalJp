const express = require('express')
const routersClientes = require('./src/routes/clientes')
const routersFilmes = require('./src/routes/filmes')
const routersFilmesLocados = require('./src/routes/filmeslocados')
const Database = require('./src/config/database')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use("/filmes", routersFilmes)
app.use("/filmeslocados", routersFilmesLocados)
app.use("/clientes", routersClientes)

Database.db
    .sync({ force: false })
    .then((_) => {
        console.info("Banco conectado com sucesso")
        app.listen(3000, () => {
            console.info(`Servidor rodando na porta 3000`)
        })
    })
    .catch((e) => {
        console.error(`Conexão falhou: ${e}`)
    })

