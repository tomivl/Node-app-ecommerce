const mongoose =require ('mongoose')

mongoose.connect('mongodb://localhost/productos-db-app')

.then (db => console.log('db connected'))
.catch(err => console.error(err))