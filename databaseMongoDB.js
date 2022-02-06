const mongoose =require ('mongoose')
// URL DE CONECCION A MONGO ATLAS
const MONGODB_URI = 'mongodb+srv://villtom:passwordinsegura@productos-db-app.rlwnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


//CONECCION A MONGO ATLAS Y EN CASO DE QUE POR ALGUN INCONVENIENTE NO FUNCIONE, CONECCION A LA BASE DE DATOS LOCAL 
mongoose.connect(MONGODB_URI ||'mongodb://localhost/productos-db-app',{
    useNewUrlParser : true,
    useUnifiedTopology: true
})

// mongoose.connect('mongodb+srv://cluster0.rlwnd.mongodb.net/myFirstDatabase', {
//     useNewUrlParser : true,
//     useUnifiedTopology: true
// })

.then (db => console.log('db connected'))
.catch(err => console.error(err))


