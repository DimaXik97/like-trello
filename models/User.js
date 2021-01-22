const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  uid: { type: String, required: true },
  savedBoard: [{ type: Types.ObjectId, ref: "Board" }],
});

module.exports = model("User", schema);
