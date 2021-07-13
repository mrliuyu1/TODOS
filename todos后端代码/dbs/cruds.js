const model = require('../dbs/model')
function findTodos (){

    return model.find()
}


function addTodos(todosName) {
    return model.create({todosName})
}

function updateOnetodos(id,isDone){
        return model.updateOne({_id : id} ,{$set: {isDone} })
}

function updateAlltodos(isDone){
    return model.updateMany({},{isDone})
}

function delTodos(ids){
    return model.deleteMany({_id : {$in: ids}})

}
function delAlltodos() {
     return model.deleteMany({isDone: true})
}
module.exports = {
    findTodos, addTodos,updateOnetodos,updateAlltodos,delAlltodos,delTodos
}