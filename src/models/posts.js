import { DataTypes } from "sequelize";
import sequelize from "../lib/config_db.js";
import User from './user.js'


const Posts = sequelize.define("Posts", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      }
  }
},
{
    tableName: 'posts',
    timestamps: false
}
);

User.hasMany(Posts, { foreignKey: "userId" });
Posts.belongsTo(User, { foreignKey: "userId" });

export default Posts;
