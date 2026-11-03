const sequelize = require('./Bd.js').sequelize;
const { DataTypes } = require('sequelize');

const Produto = sequelize.define("Produto", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    precoCompra: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    precoVenda: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    lucro: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
});

module.exports = Produto;