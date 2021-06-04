const roteador = require('express').Router();
const TabelaDiscos = require('./TabelaDiscos.js');
const Disco = require('./Discos.js');

//List all discs by a given author
roteador.get('/discos', async (req, res) => {
    const discos = await TabelaDiscos.list(req.autor.id)
    res.send(JSON.stringify(discos))
})

//Search for a disk with a specific id
roteador.get('/discos/:id', async (req, res) => {
    try {
        const dados = {
            id: req.params.id,
            autor: req.autor.id
        }

        const disco = new Disco(dados)
        disco.search()
    }
    catch (erro) {
        prox(erro)
    }
})

//Insert disks into the database, linking with the author id
roteador.post('/discos', async (req, res, prox) => {
    try {
        const idAutor = req.autor.id
        const corpo = req.body
        const dados = Object.assign({}, corpo, { autor: idAutor })
        const disco = new Disco(dados)
        await disco.add()
        res.status(201)
        res.send(disco)
    }
    catch (erro) {
        prox(erro)
    }
})

//Update information from a disk
roteador.put('/discos/:id', async (req, res, prox) => {
    try {
        const identificadores = {
            id: req.params.id,
            autor: req.autor.id
        }

        const corpo = req.body
        const dados = Object.assign({}, corpo, identificadores)
        const disco = new Disco(dados)
        await disco.update()
        res.status(204)
        res.end()
    }
    catch (erro) {
        prox(erro)
    }
})

//Delete information from a disk
roteador.delete('/discos/:id', async (req, res, prox) => {
    try {
        const dados = {
            id: req.params.id,
            autor: req.autor.id
        }

        const disco = new Disco(dados)
        await disco.remove()
        res.status(204)
        res.end()
    }
    catch (erro) {
        prox(erro)
    }
})

module.exports = roteador