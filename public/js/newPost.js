const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    createdDate: DataTypes.DATE
  },
  {
    sequelize
  }
);

module.exports = Post;