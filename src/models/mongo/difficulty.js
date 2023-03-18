import Mongoose from "mongoose";

const { Schema } = Mongoose;

const difficultySchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Difficulty = Mongoose.model("Difficulty", difficultySchema);
