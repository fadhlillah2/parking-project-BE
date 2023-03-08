const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Parking = db.define(
  "parking_db",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    vehicleTypes: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["mobil", "motor"]],
      },
    },

    vehiclePlates: { type: DataTypes.STRING },

    paymentMethod: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        isIn: [["CASH", "DEBIT", "TRANSFERS"]],
      },
    },

    voucherCode: { type: DataTypes.STRING, defaultValue: null },

    imageCheckIn: { type: DataTypes.STRING, defaultValue: null },

    imageCheckOut: { type: DataTypes.STRING, defaultValue: null },

    price: { type: DataTypes.INTEGER, defaultValue: null },

    isCheckIn: { type: DataTypes.BOOLEAN, defaultValue: true },

    isCheckOut: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

module.exports = Parking;
