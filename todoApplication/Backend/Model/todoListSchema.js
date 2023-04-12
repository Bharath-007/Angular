const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  todoName: {
    type: String,
    required: true,
  },
  todoDescription: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
  isFavourite: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    reqired: true,
  },
});
module.exports = mongoose.model("Todo", todoSchema);
