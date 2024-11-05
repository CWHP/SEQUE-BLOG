import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // for most hosted databases like Railway
      rejectUnauthorized: false, // disables SSL certificate verification
    },
  },
});

export default sequelize;
