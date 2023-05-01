const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

//TODO: You need to modify this model (or create a new one to suit your needs)
class Course extends Model {
  static async findCourse(recordid) {
    try {
      const course = await Course.findByPk(recordid);
      return course ? course : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

Course.init(
  {
    // I changed the course model and introduced this to help you
    // You may leave this record id as is for your solution
    recordid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //TODO: you need to start changing the fields below to suit your needs
    courseid: {
      type: DataTypes.STRING,
      // REMOVE the 'unique' constraint if your field doesn't need it
      unique: true,
      allowNull: false,
    },
    coursename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coursedesc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    enrollnum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Course",
  }
);

module.exports = Course;
