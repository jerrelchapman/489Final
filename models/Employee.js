const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");


class Employee extends Model {
    static async findEmployee(employeeid) {
      try {
        const employee = await Employee.findByPk(employeeid);
        return employee ? employee : null;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }
  
  Employee.init(
    {
      employeeid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  
  module.exports = Employee;
  