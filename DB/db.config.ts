import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const pgp = pgPromise();

const isProduction = process.env.NODE_ENV === "production";

const cn = {
  host: process.env.PG_HOST as string,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE as string,
  user: process.env.PG_USER as string,
  password: process.env.PG_PASSWORD as string,

  
  ssl: isProduction
    ? { rejectUnauthorized: false }
    : false,
};

const db = pgp(cn);

export default db;
