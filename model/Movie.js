const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'San01ra000', {
  host: 'localhost',
  dialect:'postgres'
});


const Movie = sequelize.define('Movie', {

  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
 year:{
    type: DataTypes.INTEGER,
 },
 length:{
    type: DataTypes.STRING,
 },
 actor:{
    type: DataTypes.STRING,
 },


}, {
    tableName: "movies",
    underscored: true,
    timestamps: false

});


console.log(Movie === sequelize.models.Movie);
module.exports = Movie;

