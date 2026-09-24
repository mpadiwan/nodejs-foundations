require("dotenv").config({ quiet: true });

const { PrismaClient } = require("../generated/prisma/client.mts");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
