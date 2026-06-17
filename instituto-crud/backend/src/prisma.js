const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1621",
    database: "instituto_db",
    connectionLimit: 10
});

const adapter = new PrismaMariaDb(pool);

const prisma = new PrismaClient({
    adapter
});

module.exports = prisma;