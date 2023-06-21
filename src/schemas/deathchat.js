const { model, Schema } = require('mongoose')
 
let deathCheat = new Schema ({
    enabled: Boolean
});
 
module.exports = model('deathchat', deathCheat)