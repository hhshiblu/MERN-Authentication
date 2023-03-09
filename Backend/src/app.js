const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;

require("../dbs/connect");
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(require("../Router/router"));

app.listen(PORT, () => {
  console.log(` server is running  http://localhost:${PORT}`);
});
