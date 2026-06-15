
const express = require("express");
const cors = require("cors");
const chatRoutes =
  require("./routes/chat");

const conversationRoutes = require("./routes/conversations");
const messageRoutes = require("./routes/message");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/conversations", conversationRoutes);
app.use("/messages", messageRoutes);
app.use("/chat", chatRoutes);

app.listen(3000, function (){
  console.log("Server running on port 3000");
});

