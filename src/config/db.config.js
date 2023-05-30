const db_host = process.env.DB_HOST || "localhost";
const db_pw = process.env.DB_PW || "bollina@123";
const db_user = process.env.DB_USER || "meghana";
const db_name = process.env.DB_NAME|| "travel_itenarary";

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
