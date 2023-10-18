const { Database } = require("@tableland/sdk");
const { getDB } = require("../constants/getDB");
const { table_name } = require("../constants/index");

exports.createTableController = async (req, res, next) => {
  const db = await getDB();

  const tableName = table_name;

  //random text will point to the safe stored in db
  const { meta: create } = await db
    .prepare(
      `CREATE TABLE ${tableName} (random_val text primary key, address text, safeAddress text);`
    )
    .run();

  console.log("create", create);

  return res.status(201).json({ message: "Table created" });
};

exports.insertData = async (req, res, next) => {
  const { randomVal, address, safeAddress } = req.body;
  const db = await getDB();

  const tableName = table_name;

  const info = await db
    .prepare(
      `INSERT INTO ${tableName} (random_val, address, safeAddress) VALUES (?1, ?2, ?3);`
    )
    .bind(randomVal, address, safeAddress)
    .run();

  return res.status(201).json({ message: "Address created", info });
};

exports.getDataFromWalletAddress = async (req, res, next) => {
  const { address } = req.params;
  const db = await getDB();

  const details = await db
    .prepare("SELECT * FROM address_key_pairs_80001_7742 WHERE address = ?1")
    .bind(address)
    .run();

  return res.status(200).json({ randomValue, details: details });
};

exports.getDataFromSafeAddress = async (req, res, next) => {
  const { safeAddress } = req.params;
  const db = await getDB();

  const details = await db
    .prepare(
      "SELECT * FROM address_key_pairs_80001_7742 WHERE safeAddress = ?1"
    )
    .bind(safeAddress)
    .run();

  return res.status(200).json({ randomValue, details: details });
};
