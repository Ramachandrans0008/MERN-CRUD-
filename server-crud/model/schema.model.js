import { model, Schema } from "mongoose";

// write the schema
const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

// create the model
const noteModel = model("note", schema);

export default noteModel;
