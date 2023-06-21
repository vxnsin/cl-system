const mongoose = require('mongoose');

const emojiSchema = new mongoose.Schema({
    userId: String,
    emoji: String,
  });
  
  module.exports = mongoose.model('Emoji', emojiSchema);