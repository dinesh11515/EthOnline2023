const { Database } = require("@tableland/sdk");
const { getDB } = require("../constants/getDB");
const { table_name } = require("../constants/index");
const Map = require("../models/map");

exports.createTableController = async (req, res, next) => {
  const db = await getDB();

  const tableName = table_name;

  //tables not created yet
  const { meta: create } = await db
    .prepare(
      `CREATE TABLE nfts (nft_id text primary key, nft_name text, nft_address text, chain_id string);`
    )
    .run();

  console.log("create", create);

  const { meta: create1 } = await db
    .prepare(`CREATE TABLE holders holder_id text primary key;`)
    .run();
  console.log("create", create1);

  return res.status(201).json({ message: "Table created" });
};

exports.insertNft = async (req, res, next) => {
  const { randomVal, nft_name, nft_address, chain_id } = req.body;

  const db = await getDB();

  const table_name = "";

  const { meta: create } = await db
    .prepare(
      `INSERT INTO ${table_name} (nft_id text primary key, nft_name text, nft_address text, chain_id string) VALUES (?1, ?2, ?3, ?4)`
    )
    .bind(randomVal, nft_name, nft_address, chain_id)
    .run();

  const newMap = new Map({
    nft_id: randomVal,
  });

  await newMap.save();

  return res.status(201).json({ message: "Done" });
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
