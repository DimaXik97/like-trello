const express = require("express");
const config = require("config");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
app.use(express.json({ extended: true }));

// initialize server app
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/board", require("./routes/saveBoard.routes"));
app.use("/api/board", require("./routes/board.routes"));
// make server listen on some port
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "clientApp", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "clientApp", "build", "index.html"));
  });
}

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
