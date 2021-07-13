;(async function(){
    const express = require('express')
    const cors = require('cors')
    const db = require('./dbs/db')
    const logicRouter = require('./routers/logic')
    await db
    console.log('okk');
const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(logicRouter)
app.listen(5000,(err) => {
    if(err) {console.log('lost')}
    else {console.log('ok')}
})
})()