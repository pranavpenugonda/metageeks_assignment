const express = require("express");
const app = express();

const logRequest = (req, res, next) => {
  const timestamp = new Date();
  const requestedUrl = req.originalUrl;

  console.log(`[${timestamp}] Requested URL: ${requestedUrl}`);

  next();
};

app.use(logRequest);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
