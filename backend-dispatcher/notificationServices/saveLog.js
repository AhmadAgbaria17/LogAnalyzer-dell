const Log = require("../models/Log"); // Import your log model
const connectToDB = require("../utils/db");

async function saveLog(
  errorId,
  severity,
  operation,
  timestamp,
  userName,
  databaseName
) {
  try {
    await connectToDB(databaseName);
    const log = new Log({
      errorId,
      severity,
      operation,
      timestamp,
      userName,
    });
    await log.save();
  } catch (error) {
    console.error("Error saving log:", error);
  }
}

module.exports = saveLog;
