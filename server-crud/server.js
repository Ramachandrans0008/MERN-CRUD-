import express from "express";
import cors from "cors";
import connectdb from "./Lib/db.js";
import noteModel from "./model/schema.model.js";

const app = express();
const PORT = process.env.PORT || 4000;

// NETWORK ERROR HANDLING
app.use(cors());

// MIDDLEWARE
app.use(express.json());

// DB
connectdb();

// CREATE ITEM
app.post("/notes", async (req, res) => {
  // FIRST WE HAVE TO CHECK THE DATA USING SCHEMA
  const { title, desc } = req.body;
  try {
    const newnote = new noteModel({ title, desc });
    await newnote.save();
    res.status(201).json(newnote);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
});

//  GETTING ALL DATAS
app.get("/notes", async (req, res) => {
  try {
    const getnote = await noteModel.find();
    res.json(getnote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATING THE DATAS
app.put("/notes/:id", async (req, res) => {
  try {
    const { title, desc } = req.body;
    const id = req.params.id;
    const updatednotes = await noteModel.findByIdAndUpdate(
      id,
      { title, desc },
      { new: true }
    );

    if (!updatednotes) {
      res.status(404).json({ message: "Couldn't find Notes" });
    } else {
      res.json(updatednotes);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// DELETING THE DATAS

app.delete("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log("server running in " + PORT);
});
