"user strict";

const connection = {
  host: "localhost",
  user: process.env.user,
  password: process.env.pass,
  database: "grab",
};

module.exports = connection;
