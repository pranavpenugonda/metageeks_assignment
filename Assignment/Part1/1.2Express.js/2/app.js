const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();

app.use(express.json());

const dbPath = path.join(__dirname, "posts.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/", async (req, res) => {
  try {
    const query = "select * from post";
    const result = await db.all(query);
    res.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    response
      .status(500)
      .json({ error: "An error occurred while fetching data" });
  }
});
