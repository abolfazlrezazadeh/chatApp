const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

//set the template engine ejs
app.set("view engine", "ejs");
app.set("views", "views");
//middlewares
app.use(express.static(path.join(__dirname, "public")));

//routes
app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", function (socket) {
  socket.on("chatMessage", function (from, msg) {
    io.emit("chatMessage", from, msg);
  });
});

//Listen on port 3000
server.listen(3000, () => {
  console.log("app connected on port 3000");
});
