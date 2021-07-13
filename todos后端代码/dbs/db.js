const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb://127.0.0.1:27017/llyy',{
    useCreateIndex : true,
    useFindAndModify : true,
    useUnifiedTopology : true,
    useNewUrlParser : true
})