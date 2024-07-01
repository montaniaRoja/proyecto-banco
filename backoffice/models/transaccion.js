'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Transaccion.belongsTo(models.Cuenta, { foreignKey: 'cuenta_id' });
    }
  }
  Transaccion.init({
    cuenta_id: DataTypes.INTEGER,
    tipo_movimiento: DataTypes.STRING,
    monto: DataTypes.DECIMAL,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaccion',
    tableName: 'tbl_transacciones',
    timestamps: true
  });
  return Transaccion;
};