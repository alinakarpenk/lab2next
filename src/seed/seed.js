import sequelize from "../lib/config_db.js";
import User from "../models/user.js";
import Post from "../models/posts.js";


const users = [
  { login: "user_first", password: "password123" },
  { login: "user_third", password: "password12345" },
  { login: "user_fourth", password: "12345" },
  { login: "user_fifth", password: "d12345" }
];

const posts = [
  { title: "My first post", text: "This is my first post!", userLogin: "user_first" },
  { title: "Another post", text: "Just another post!", userLogin: "user_third" },
  { title: "My another fourth post", text: "This is my fourth post!", userLogin: "user_fourth" },
  { title: "Another fifth post", text: "Just another fifth post!", userLogin: "user_fifth" },
];

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log("База даних оновлена");

    const createdUsers = await Promise.all(
      users.map(async (user) => {
        return await User.create({ login: user.login, password: user.password });
      })
    );

    console.log(`Додано ${createdUsers.length} користувачів`);

    const createdPosts = await Promise.all(
      posts.map(async (post) => {
        const user = createdUsers.find((us) => us.login === post.userLogin);
        if (user) {
          return await Post.create({ title: post.title, text: post.text, userId: user.id });
        } else {
          return null;
        }
      })
    );

    console.log(`Додано ${createdPosts.filter(post => post).length} постів`);

    console.log("завершено!");
    process.exit();
  } catch (error) {
    console.error("Помилка:", error);
    process.exit(1);
  }
}

seedDatabase();


