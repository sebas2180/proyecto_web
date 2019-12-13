const express = require('express');
const http = require('http');
const app = express();
const path= require('path');// se encarga de unir directorios
const fs = require('fs');
const passport = require('passport');
require('./passport/local-auth.js');
const flash = require('connect-flash');//me sirve para manejo de sessiones
//const cookieParser = require('cookie-parser');//me sirve para manejar las cookies del navegador
const body_parser = require('body-parser');// lo utilizo para obtener datos de formulario url y guardarlo 
const nodemailer = require('nodemailer')  ;
const morgan = require('morgan');
app.set('view engine', 'ejs'); 
//app.use(cookieParser());
const session = require('express-session');//manejo de sesiones con las cookies del navegador
const mongoose = require('mongoose');//sirve para definir el modelo
const mongo_store= require('connect-mongo')(session);
mongoose.Promise = global.Promise;//que utilise las mismas promesas que nodejs
mongoose.connect('mongodb://localhost:27017',{dbName:'lanelly',useNewUrlParser: true,useUnifiedTopology: true });
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

mongoose.connection.on('error',(err)=>{
    throw err;
  //process.exit(1);//paro el proceso de la aplicacion
});


const server = http.createServer(app);
app.use(body_parser.urlencoded({extended:true}));// en las POST solo quiero procesa datos y json, no imagenes 
app.use(body_parser.json());
app.set('port',process.env.port||2000);
app.use(express.static(path.join(__dirname,'public')));//le indico en donde estan los archivos estaticos(css,img)

app.use(passport.initialize())// inicia passport
app.use(passport.session())// inicia la session de passport
app.use(flash());

const rutas = require('./public/modulos/rutasReserva')(app,passport);
const lista_reserva_rutas = require('./public/modulos/rutasListaReservas')(app,passport);
const conexion = require('./public/modulos/conexionMySql');
const user_routes = require('./public/modulos/users_routes')(app,passport);
const rutas_dias_especiales = require('./public/modulos/rutas_dias_especiales')(app,passport);
app.get('/', function (req, res) {
  req.session.cuenta= req.session.cuenta ? req.session.cuenta + 1: 1;
    res.redirect('./inicio.html');
  });
server.listen(2000,()=>{
    console.log('server ok');
    });
    