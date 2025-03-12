'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      console.log("Available models in Comment.associate:", Object.keys(models));

      if (!models.User) {
        throw new Error("User model is undefined in Comment.associate");
      }
      if (!models.Post) {
        throw new Error("Post model is undefined in Comment.associate");
      }
      Comments.belongsTo(models.User, { foreignKey: 'user_id'});
      Comments.belongsTo(models.Post, { foreignKey: 'post_id'});
    }
  }
  Comments.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  

  return Comments;
};