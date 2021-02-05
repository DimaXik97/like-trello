const { Schema, model } = require("mongoose");

const schema = new Schema({
  owner: { type: String, required: true },
  isPublic: { type: Boolean, required: true },
  name: { type: String, required: true },
  availableFor: [{ type: String }],
  createdAt: { type: Date, required: true },
});

module.exports = model("Board", schema);
