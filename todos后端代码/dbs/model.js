const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todosSchema = new Schema({
    todosName : {
        type : String,
        required : true,
        unique : true
    },
    isDone : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('todos',todosSchema)