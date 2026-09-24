const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");

require("dotenv").config({
  path: path.join(projectRoot, ".env.test"),
  override: true,
  quiet: true,
});

module.exports = async function globalSetup() {
  const dbPath = path.join(projectRoot, "test.db");
  for (const suffix of ["", "-journal", "-wal", "-shm"]) {
    const file = dbPath + suffix;
    if (fs.existsSync(file)) fs.unlinkSync(file);
  }

  execSync("npx prisma migrate deploy", {
    cwd: projectRoot,
    env: process.env,
    stdio: "inherit",
  });
};
