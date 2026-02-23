const express = require("express");
const connectionDb = require("./app/config/db");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
connectionDb();

let Port = parseInt(process.env.PORT) || 3006;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mainRouter = require("./app/router/index");
app.use("/api", mainRouter);

const server = app.listen(Port, () => {
  console.log(`Server running at: http://localhost:${Port}/`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Port ${Port} is in use, trying port ${Port + 1}...`);
    Port += 1;
    server.close();
    app.listen(Port, () => {
      console.log(`Server running at: http://localhost:${Port}/`);
    });
  } else {
    throw err;
  }
});
