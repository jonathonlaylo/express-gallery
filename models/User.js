module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Userl", {
    username: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models){
        User.hasMany(models.Gallery);
      }
    }
  });
  return User;
};