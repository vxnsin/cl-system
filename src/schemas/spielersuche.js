const { model, Schema } = require('mongoose')
 
let spielerSucheSchema = new Schema ({
    enabled: Boolean
});
 
module.exports = model('spielersuche', spielerSucheSchema)