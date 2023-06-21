const { model, Schema } = require('mongoose')

let levelSchema = new Schema ({
    enabled: Boolean,
    userId: {
        type: String,
        require: true,
    },
    guildId: {
        type: String,
        require: true,
    },
    xp: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 0,
    }
})
 
module.exports = model('Level', levelSchema)