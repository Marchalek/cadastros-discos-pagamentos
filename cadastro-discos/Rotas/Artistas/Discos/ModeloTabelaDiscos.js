const Sequelize = require('sequelize')
const Instancia = require('../../../Banco-de-Dados')

const colunasDaTabela = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    autor: {    //Deve receber o ID do autor
        type: Sequelize.INTEGER, 
        allowNull: false,
        // references: {
        //     model: require(''),
        //     key: 'id'
        // }
    },
    ano: {
        type: Sequelize.STRING,
        allowNull: false
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'discos',
    timestamps: true,
    createdAt: 'dataCriacao'
};

module.exports = Instancia.define('disco', colunasDaTabela, opcoes)