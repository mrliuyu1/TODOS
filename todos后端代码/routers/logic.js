const express = require('express');

const {findTodos,addTodos,updateOnetodos,updateAlltodos,delAlltodos} = require('../dbs/cruds')
const router = express.Router();
const model = require('../dbs/model')

router.get('/findtodos',async (req,res) => {
    const { callback } = req.query
 
    let todo = await findTodos()
    todo = JSON.stringify(todo)
    res.send(`${callback}(${todo})`)
})

router.post('/addtodos',async (req,res) => {
    
    const {todosName} = req.body
 
     await  addTodos(todosName)
    const result = await findTodos()
    res.send(result)
})

router.post('/updateOnetodos',async (req,res) => {
           const { id , isDone } = req.body
           
        await updateOnetodos(id, isDone)
        const result = await findTodos()
        res.send(result)


})  

router.post('/updateAlltodos', async (req, res) => {
        const { isDone } = req.body

        await updateAlltodos(isDone)
        const result = await findTodos()
        res.send(result)

 })

 router.post('/delAlltodos', async (req,res) =>{
       
        let { ids } = req.body
        ids = JSON.parse(ids)
       //  const arr = ids.split(',')
       console.log(ids);
        await delAlltodos(ids)
        const result = await findTodos()
        res.send(result)

 })
/*  router.get('/delAlltodos', async (req,res) =>{
     
        await delAlltodos()
        const result = await findTodos()
        res.send(result)

 }) */
module.exports = router