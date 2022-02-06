const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

//MASTER
if(cluster.isMaster) {
    console.log(numCPUs)
    console.log(`PID MASTER ${process.pid}`)
}


// INICIALIZACIONES
const app = express()
require('./databaseMongoDB')
require('./config/passport')

//CONFIGURACIONES
app.set('port', process.env.PORT || 8080 )
app.set('views', path.join(__dirname, 'views'))
app.engine('hbs',
 handlebars.engine({
    defaultLayout:'main' ,
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs'
}))
app.set('view engine', '.hbs')

// ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, "public")))

//MIDDLEWARES   
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(
    session({
    secret: "secreto",
    resave : true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//VARIABLES GLOBALES
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error= req.flash('error')
    res.locals.usuario = req.usuario || null
    next()
})

//INFO
app.get('/info', (req,res) => {
    res.render("info", {
        args:  JSON.stringify(process.argv,null,'\t'),
        path: process.execPath,
        plataforma: process.platform,
        pid: process.pid,
        version: process.version,        
        dir: process.cwd(),        
        memoria: JSON.stringify(process.memoryUsage(),null,'\t'),
        numCPUs
    })
})


//SERVER
const server = app.listen(app.get('port'), () => {
    console.log('escuchando en puerto', app.get('port'))
})

//WEBSOCKETS
const SocketIO = require('socket.io')
const io = SocketIO(server)
io.on('connection', (socket) => {
    console.log('nueva conexion', socket.id)
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data)
    })
})

//RUTAS
app.use(require('./routes/index'))
app.use(require('./routes/productos'))
app.use(require('./routes/usuarios'))
app.use(require('./routes/tienda'))
app.use(require('./routes/carts'))
app.use(require('./routes/order'))
app.use(require('./routes/routechat'))



