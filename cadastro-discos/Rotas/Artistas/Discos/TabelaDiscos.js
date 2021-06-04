const Modelo = require('./ModeloTabelaDiscos.js')

module.exports = {
    list(idArtista) {
        return Modelo.findAll({
            where: { artista: idArtista }
        })
    },

    async takeByID(idDisco, idAutor) {
        return Modelo.findOne({
            where: { id: idDisco, autor: idAutor }
        })
    },

    insert(dados) {
        return Modelo.create(dados)
    }, 

    revise(idDisco, idAutor, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: idDisco, autor: idAutor }
            }
        )
    },

    delete(idDisco, idAutor) {
        return Modelo.destroy({
            where: { id: idDisco, autor: idAutor }
        })
    }
}