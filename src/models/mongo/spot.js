import Mongoose from "mongoose";

const { Schema } = Mongoose;

const spotSchema = new Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  description: String,
  difficultyid: {
    type: Schema.Types.ObjectId,
    ref: "Difficulty",
  },
});

export const Spot = Mongoose.model("Spot", spotSchema);
