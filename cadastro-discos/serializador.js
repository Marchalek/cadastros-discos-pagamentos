const unsupportedValue = require('./Erros/UnsupportedValue.js')

class Serializador {
    json(dados) {
        return JSON.stringify(dados)
    }

    xml(dados) {
        let tag = this.tagSingular

        if(Array.isArray(dados)) {
            tag = this.tagPlural
            dados = dados.map((item) => {
                return { [this.tagSingular]: item }
            })
        }

        return jsonToXml({ [tag]: dados })
    }

    serialize(dados) {
        dados = this.filter(dados)

        if(this.contentType === 'application/json') {
            return this.json(dados)
        }

        if(this.contentType === 'applicatin/xml') {
            return this.xml(dados)
        }

        throw new unsupportedValue(this.contentType)
    }

    filterObject(dados) {
        const newObject = {}

        this.publicFields.forEach((field) => {
            if(dados.hasOwnProperty(field)) {
                newObject[field] = dados[field]
            }
        })

        return newObject
    }

    filter(dados) {
        if(Array.isArray(dados)) {
            dados = dados.map(item => {
                return this.filterObject(item)
            })
        } else {
            dados = this.filterObject(dados)
        }

        return dados
    }
}

class SerializadorErro extends Serializador {
    constructor(contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = [
            'id',
            'mensagem'
        ].concat(extraFields || [])
        this.tagSingular = 'erro'
        this.tagPlural = 'erros'
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorErro: SerializadorErro,
    acceptedFormats: ['application/json', 'application/xml']
}