const { getDB } = require("../constants/getDB");
const { table_name } = require("../constants/index");
const Map = require("../models/map");
const { v4 } = require("uuid");

//creates the nft table
exports.createTableController = async (req, res, next) => {
  const db = await getDB();

  const tableName = table_name;

  //tables not created yet
  const { meta: create } = await db
    .prepare(
      `CREATE TABLE nfts (nft_id text primary key, nft_name text, nft_address text, chain_id string);`
    )
    .run();

  console.log("create nft table", create);

  const { meta: create1 } = await db
    .prepare(`CREATE TABLE holders holder_id text primary key;`)
    .run();
  console.log("create holder table", create1);

  return res.status(201).json({ message: "Table created" });
};
///the upper one should only be used once

//adds new holder address in tableland DB
exports.addNewHolder = async (req, res, next) => {
  const { holder_address } = req.params;
  try {
    const db = await getDB();
    const holder_table_name = "";

    const alreadyInfo = await db
      .prepare(`SELECT * FROM ${holder_table_name} WHERE holder_id = ?1`)
      .bind(holder_address)
      .all();

    if (alreadyInfo.results.length > 0) {
      return res.status(400).json({ message: "Address already exist" });
    }

    const info = await db
      .prepare(`INSERT INTO ${holder_table_name} (holder_id) VALUES (?1)`)
      .bind(holder_address)
      .run();

    return res.status(201).json({ message: "Successfully added new address" });
  } catch (error) {
    console.log("error is", error);
  }
};

//creates the new map and add the nft into tableland if doesn't exist already
exports.createNewMap = async (req, res, next) => {
  const { nft_address, holder_address, threshold, chain_id } = req.body;

  try {
    const db = await getDB();

    const table_name = "";

    const holder_table_name = "";

    const data = await db
      .prepare(`SELECT * FROM ${table_name} WHERE nft_address = ?1`)
      .bind(nft_address)
      .all();

    if (data.results.length === 0) {
      const info = await db
        .prepare(
          `INSERT INTO ${table_name} (nft_id text primary key, nft_name text, nft_address text, chain_id string) VALUES (?1, ?2, ?3, ?4)`
        )
        .bind(nft_address, nft_name, nft_address, chain_id)
        .run();
    }

    const holderInfo = await db
      .prepare(`INSERT INTO ${holder_table_name} (holder_id) VALUES (?1)`)
      .bind(holder_address)
      .run();

    console.log("nft info", info);
    console.log("holder info", holderInfo);

    const map = new Map({
      nft_address,
      holder_addresses: [holder_address],
      threshold,
    });

    await map.save();

    return res.status(201).json({ message: "Successfully created new map" });
  } catch (error) {
    console.log("error is", error);
  }
};

//adds the safe address to the map
exports.addSafeAddress = async (req, res, next) => {
  const { id, safe_address } = req.body;

  try {
    const map = await Map.findOne({ _id: id });

    map.safe_address = safe_address;

    await map.save();

    return res.staus(201).json({ message: "Successfully added safe address" });
  } catch (err) {
    console.log("err is", err);
  }
};

//get all the maps attached with the nft
exports.getAllMapsFromNft = async (req, res, next) => {
  const { nft_address } = req.params;

  try {
  } catch (err) {
    console.log("err is", err);
  }
};
