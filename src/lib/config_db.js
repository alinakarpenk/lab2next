import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Завантажуємо змінні середовища з .env
dotenv.config(); // автоматично шукає .env або .env.local в корені проекту

// Виводимо значення змінних середовища для перевірки
console.log("DB CONFIG:", {
  name: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST
});

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: false,
    dialectModule: require("mysql2")
  }
);

export default sequelize;
