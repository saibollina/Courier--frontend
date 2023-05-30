const db_host = process.env.DB_HOST || "127.0.0.1";
const db_pw = process.env.DB_PW || "";
const db_user = process.env.DB_USER || "root";
const db_name = process.env.DB_NAME|| "itenary";

export const HOST = db_host;
export const USER = db_user;
export const PASSWORD = db_pw;
export const DB = db_name;
export const dialect = "mysql";
export const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};
