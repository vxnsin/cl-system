const { model, Schema } = require('mongoose')
 
let welcomeschema = new Schema ({
    enabled: Boolean
});
 
module.exports = model('welcome', welcomeschema)