const mongoose = require("mongoose");

const afkSchema = new mongoose.Schema({
  enabled: Boolean,
  userId: String,
  afk: Boolean,
  reason: String,
  nickname: String,
  startTime: Date,
});

module.exports = mongoose.model("Afk", afkSchema);
