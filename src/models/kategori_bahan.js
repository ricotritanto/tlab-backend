const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kategori_bahan', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_bahan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bahan',
        key: 'id'
      }
    },
    id_kategori: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'kategori',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'kategori_bahan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "kategori_bahan_FK",
        using: "BTREE",
        fields: [
          { name: "id_bahan" },
        ]
      },
      {
        name: "kategori_bahan_FK_1",
        using: "BTREE",
        fields: [
          { name: "id_kategori" },
        ]
      },
    ]
  });
};
