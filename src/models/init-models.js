var DataTypes = require("sequelize").DataTypes;
var _resep = require("./resep");
var _bahan = require("./bahan");
var _kategori_bahan = require("./kategori_bahan");
var _kategori = require("./kategori");

function initModels(sequelize) {
  var resep = _resep(sequelize, DataTypes);
  var bahan = _bahan(sequelize, DataTypes);
  var kategori_bahan = _kategori_bahan(sequelize, DataTypes);
  var kategori = _kategori(sequelize, DataTypes);

  resep.belongsTo(kategori, { as: "kategori", foreignKey: "id_kategori"});
  kategori.hasMany(resep, { as: "reseps", foreignKey: "id_kategori"});
  kategori.belongsToMany(bahan, { through: kategori_bahan ,foreignKey: "id_kategori"});
  bahan.belongsToMany(kategori, { through: kategori_bahan ,foreignKey: "id_bahan"},);

  return {
    resep,
    bahan,
    kategori_bahan,
    kategori
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
