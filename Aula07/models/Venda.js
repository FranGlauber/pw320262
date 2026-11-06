const sequelize = require('./Bd.js').sequelize;
const { DataTypes } = require('sequelize');
const Cliente = require('./Cliente.js');
const Produto = require('./Produto.js');

const Venda = sequelize.define("Venda", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    qtd: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precoTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
});

Venda.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Venda.belongsTo(Produto, { foreignKey: 'id_produto' });
Cliente.hasMany(Venda, { foreignKey: 'id_cliente' });
Produto.hasMany(Venda, { foreignKey: 'id_produto' });

module.exports = Venda;