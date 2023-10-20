const express = require("express");

const {
  createTableController,
  insertData,
  getDataFromWalletAddress,
  getDataFromSafeAddress,
} = require("../controllers/database");

const app = express.Router();

app.get("/create-table", createTableController);
app.post("/insert-data", insertData);
app.get("/get-data-from-wallet-address/:address", getDataFromWalletAddress);
app.get("/get-data-from-safe-address/:safeAddress", getDataFromSafeAddress);

module.exports = app;