const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()
const login = require('./Router/LoginRoute')
const db = require('./database/database')
const User = require('./Seq-DB/Usermodel')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const Sequelizesession = require('connect-session-sequelize')(session.Store)

app.use(bodyParser.urlencoded({extended : false}))

app.use(express.static(path.join(__dirname, 'Public')))
const server = http.createServer(app)


const sequelizeSession = new Sequelizesession({
    db : db,
    tableName : "sessions"
})

app.use(session({
    secret : "my secret session",
    saveUninitialized : false,
    resave : false,
    store : sequelizeSession
}))

app.use(flash())
app.use(login)

app.set('view engine', 'ejs')
app.set('views', 'views')



db.sync()
.then(()=>{
    server.listen(4004, (err)=>{
        if(err){
            console.log('Error')
        }else{
            console.log('Sever Started in 4004 and running !!')
        }
    })
})
.catch(err=> console.log(err))

