const { model, Schema } = require('mongoose')
 
let serverBewertenSchema = new Schema ({
    enabled: Boolean
});
 
module.exports = model('serverbewerten', serverBewertenSchema)