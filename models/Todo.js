const mongoose = require("mongoose");
const uuid = require("uuid");

const TodoSchema = mongoose.Schema({
  id: {
    type: String,
    default: uuid.v4(),
  },
  order: Number,
  description: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Todos', TodoSchema);