const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbRoutes = require("./routes/database");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(dbRoutes);

app.listen(8000, () => {
  console.log("Server started");
});
