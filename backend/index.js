import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";
import userChats from "./models/userChats.js";
import Chat from "./models/chat.js";
import dotenv from "dotenv";
import { clerkClient, requireAuth, getAuth } from "@clerk/express";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const port = process.env.PORT || 3000;

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.json(result);
});

app.post("/api/chats", requireAuth(), async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.auth.userId;

    if (!userId || !text) {
      return res.status(400).json({ error: "Missing userId or text" });
    }

    // Create a new chat entry
    const newChat = new Chat({
      userId,
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    // Find userChats document
    let userChatRecord = await userChats.findOne({ userId });

    if (!userChatRecord) {
      // If user doesn't have a chat record, create a new one
      const newUserChats = new userChats({
        userId,
        chats: [{ _id: savedChat._id, title: text.substring(0, 40) }],
      });
      await newUserChats.save();
    } else {
      // If user exists, update their chat list
      await userChats.updateOne(
        { userId },
        {
          $push: {
            chats: { _id: savedChat._id, title: text.substring(0, 40) },
          },
        }
      );
    }

    res.status(201).json({ chatId: savedChat._id });
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/userchats", requireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  try {
    // Rename local variable to avoid conflict with imported model
    const userChatsRecord = await userChats.find({ userId });
    res.status(200).send(userChatsRecord[0]?.chats || []);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching userchats");
  }
});

app.get("/api/chats/:id", requireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: userId });
    res.status(200).send(chat);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching chat");
  }
});
// store the chat data
app.put("/api/chats/:id", requireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { question, answer, img } = req.body;
  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    res.status(200).send(updatedChat);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding the Conversation..");
  }
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(401).send("Unauthorized");
});
app.get(express.static(path.join(__dirname, "../client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});
app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});
