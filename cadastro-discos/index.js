const express = require('express')
const app = express()
const config = require('config')
const Roteador = require('./Rotas/Artistas/Discos/index.js')
const acceptedFormats = require('./serializador').acceptedFormats

app.use(express.json())

app.use((req, res, prox) => {
    //Stores the format of the information received in the 'Accept' header in the 'requested format' variable
    let requiredFormat = req.header('Accept')

    //If the 'requested format' is equal to empty, that is, */*
    if(requiredFormat === '*/*') {
        requiredFormat = 'aplication/json'
    }

    //If the 'requested format' does not exist in the 'accepted formats' list by the application
    if(acceptedFormats.indexOf(requiredFormat) == -1) {
        res.status(406)
        res.end()
        return
    }

    //Sets the format of the information in the 'Content-Type' header to be the same as the 'requested format' received
    res.setHeader('Content-Type', requiredFormat)
    prox()
})

app.use('/API/Autores/:id', Roteador)

// app.use((erro, req, res, prox) => {
// })

app.listen(config.get('api.porta'), () => console.log("The API is connected!"))
