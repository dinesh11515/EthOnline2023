const { Schema, default: mongoose } = require("mongoose");

const mapSchema = new Schema({
  nft_address: {
    type: String,
  },
  holder_addresses: [
    {
      type: String,
    },
  ],
  safe_address: {
    type: String,
  },
});

module.exports = mongoose.model("Map", mapSchema);
