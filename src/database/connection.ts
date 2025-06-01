import { Sequelize } from "sequelize-typescript";
import { dbConfig } from "../config/config";

const sequelize = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  dialect: "mysql",
  port: dbConfig.port,
  models: [__dirname + "/models"],
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Authenticated , connected");
  })
  .catch((err) => {
    console.log(err);
  });

sequelize.sync({ force: false }).then(() => {
  console.log("migrated successfully");
});

export default sequelize;
