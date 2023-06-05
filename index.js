import express from "express";
import handleChatRequest from "./chatController.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/api/v1/chat", handleChatRequest);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
