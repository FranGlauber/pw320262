const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize("pw3","root","",{
    host:"localhost",
    //dialect:"mysql",
    dialect: 'sqlite',
    storage: './database.sqlite', // Caminho onde o arquivo do banco será salvo 
   logging:false

});


exports.sequelize = sequelize;
