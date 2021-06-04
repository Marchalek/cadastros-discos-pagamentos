const TabelaDisco = require('./TabelaDiscos.js')

class Disco {
    constructor({ id, nome, autor, ano, genero, preco, dataCriacao }) {
        this.id = id 
        this.nome = nome
        this.autor = autor 
        this.ano = ano
        this.genero = genero
        this.preco = preco 
        this.dataCriacao = dataCriacao         
    }

    //Validate the fields
    validate() {
        if(typeof this.nome !== 'string' || this.nome.length === 0) {
            throw new Error("The 'nome' field is invalid!")
        }

        if(typeof this.genero !== 'string' || this.genero.length === 0) {
            throw new Error("The 'genero' field is invalid!")
        }

        if(typeof this.preco !== 'number' || this.preco === 0) {
            throw new Error("The 'preco' field is invalid!")
        }
    }

    //Search for information
    async search() {
        const disco = await TabelaDisco.takeByID(this.id, this.autor)
        this.nome = disco.nome
        this.ano = disco.ano
        this.genero = disco.genero
        this.preco = disco.preco
        this.dataCriacao = disco.dataCriacao
    }

    //Forward the information that must be added
    async add() {
        this.validate()
        const result = await TabelaDisco.insert({
            nome: this.nome,
            autor: this.autor,
            ano: this.ano,
            genero: this.genero,
            preco: this.preco
        })

        this.id = result.id,
        this.dataCriacao = result.dataCriacao
    }

    //Update information
    async update() {
        await TabelaDisco.takeByID(this.id, this.autor)
        const fields = ['nome', 'autor', 'ano', 'genero', 'preco']
        const dadosParaAtualizar = {}

        fields.forEach((field) => {
            const value = this[field]

            if(typeof value === 'string' && value.length > 0) {
                dadosParaAtualizar[field] = value
            }
        })

        if(Object.keys(dadosParaAtualizar).length === 0) {
            throw new Error("Data to update not passed!")
        }

        await TabelaDisco.revise(this.id, dadosParaAtualizar)
    }

    //Forwards the reference of what should be deleted
    remove() {
        return TabelaDisco.delete(this.id, this.autor)
    }
}

module.exports = Disco