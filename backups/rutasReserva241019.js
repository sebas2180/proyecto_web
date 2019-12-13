const express = require('express');
const rutas = express();
const path= require('path');
rutas.use(express.static(path.join(__dirname,'public')));
const nodemailer = require('nodemailer')  ;
///con estas 3 lineas uso el modulo conexionMySql
const dbConnection  = require('./conexionMySql');
var connection;
connection = dbConnection.dbConnection();
///


rutas.post('/turnos',(req,res)=>{
    var linea = 'select * from salon s inner join turno t ON t.id_salon=s.id_salon'+
    ' inner join horario h ON h.id_turno=t.id_turno '+
    'where t.turno=\''+req.body.turno+'\' and s.nombre=\''+req.body.salon+'\' and t.dia=\''+req.body.fecha+'\'';
    console.log(linea);
    connection.query(linea,function(err,resultado){
       if(err) throw err;
       if(resultado[0] == null){
          var linea0 ='select * from salon where nombre=\''+req.body.salon+'\'';
          console.log('linea 0: '+linea0);
          connection.query(linea0,(err,resultado_salon)=>{
             if(err) throw err;
                 var id=resultado_salon[0].id_salon;
                 var linea1='insert into turno(id_salon,turno,resta,dia) values('+id+',\''+req.body.turno+'\','+resultado_salon[0].capacidad+',\''+req.body.fecha+'\')';
                console.log('linea 1 :     '+linea1);
                 connection.query(linea1,(err,result)=>{
                    var lineaMAX ='select max(id_turno) as max from turno';
                    console.log(lineaMAX);
                    connection.query(lineaMAX ,(err,resu)=>{
                      if(err) throw err;
                       if(req.body.turno=='almuerzo'){
                         var hora1='INSERT INTO horario(id_turno,hora) SELECT  '+resu[0].max+',\'11:45\' '+
                         'WHERE NOT EXISTS (SELECT id_turno,hora FROM horario WHERE id_turno= '+resu[0].max+' and hora=\'11:45\')';
                         console.log(hora1);
                         var hora2='INSERT INTO horario(id_turno,hora) SELECT  '+resu[0].max+',\'12:00\' '+
                         'WHERE NOT EXISTS (SELECT id_turno,hora FROM horario WHERE id_turno= '+resu[0].max+' and hora=\'12:00\')';
                         var hora3='INSERT INTO horario(id_turno,hora) SELECT  '+resu[0].max+',\'12:15\' '+
                         'WHERE NOT EXISTS (SELECT id_turno,hora FROM horario WHERE id_turno= '+resu[0].max+' and hora=\'12:15\')';
                         var hora4='INSERT INTO horario(id_turno,hora) SELECT  '+resu[0].max+',\'12:30\' '+
                         'WHERE NOT EXISTS (SELECT id_turno,hora FROM horario WHERE id_turno= '+resu[0].max+' and hora=\'12:30\')';
                         connection.query(hora1);
                         connection.query(hora2);
                         connection.query(hora3);
                         connection.query(hora4);
                       }else{
                         var hora1='INSERT INTO horario(id_turno,hora) SELECT  '+resu[0].max+',\'20:00\' '+
                         'WHERE NOT EXISTS (SELECT id_turno,hora FROM horario WHERE id_turno= '+resu[0].max+' and hora=\'20:00\')';
                         console.log(hora1);
                         var hora2='INSERT INTO horario(id_turno,hora) SELECT  '+resu[0].max+',\'21:00\' '+
                         'WHERE NOT EXISTS (SELECT id_turno,hora FROM horario WHERE id_turno= '+resu[0].max+' and hora=\'21:00\')';
                         var hora3='INSERT INTO horario(id_turno,hora) SELECT  '+resu[0].max+',\'20;30\' '+
                         'WHERE NOT EXISTS (SELECT id_turno,hora FROM horario WHERE id_turno= '+resu[0].max+' and hora=\'20:30\')';
                         var hora4='INSERT INTO horario(id_turno,hora) SELECT '+resu[0].max+',\'21:30\' '+
                         'WHERE NOT EXISTS (SELECT id_turno,hora FROM horario WHERE id_turno= '+resu[0].max+' and hora=\'21:30\')';
                         connection.query(hora1);
                         connection.query(hora2);
                         connection.query(hora3);
                         connection.query(hora4);
                       }
                    });
                 });
          });
 
       }else{
         
          console.log('selse');
       };
       console.log('fin1');
       res.end();
    });
    console.log('fin2');
  });
  rutas.post('/reservas',(req,res,next)=>{
    var lineaBusq= 'select count(1) as countBusq  from reserva where ((email=\''+req.body.email+'\' or telefono='+req.body.telefono+') and dia=\''
    +req.body.fecha+'\''+' and turno=\''+req.body.turno+'\')';
    console.log(lineaBusq);
    connection.query(lineaBusq,(err,resultBusq)=>{
       console.log(resultBusq[0].countBusq);
          if(resultBusq[0].countBusq != 0){
             var response = {
                status  : 400,
                success : 'El usuario ya posee una reserva en mismo dia y turno.',
               
            }
             res.end(JSON.stringify(response));
          }else{
             var resta =0;var id_salon=-2;
             // levantar resta de turno y compararlo contra comensales de reserva nueva
             var lineaTurno='SELECT sum(t.resta) as resta,S.id_salon AS id_salon  FROM TURNO T'+
             ' INNER JOIN salon S ON T.id_salon=S.id_salon WHERE T.dia=\''+req.body.fecha+'\' AND T.turno=\''+req.body.turno+'\' AND S.nombre=\''+req.body.salon+'\'';
             console.log(lineaTurno);
             connection.query(lineaTurno,(err,resultTurno)=>{
                if(err) throw err;
                console.log(resultTurno[0].resta +' < '+req.body.personas);
                if((resultTurno[0].resta)!=null){
                      resta =resultTurno[0].resta ;
                      id_salon=resultTurno[0].id_salon ;
                }
                if(resta < req.body.personas){
                   var msj= 'No tenemos lugar en el salon seleccionado. Proba con otro salon !';
                   var response = {
                      status  : 600,
                      success : msj,
                      
                  }
                   res.end(JSON.stringify(response));
                }else{
                     // en caso error, devolver status.
             // en caso correcto, levantar max_comensales de feriado segun dia, en caso de no estar ahi, levantar de 
             // max_comensales de comensales_dias
             // en caso de que la cantidad de comensales requerido exceda el permitido, devolver status
             //y desde jquery decir el error.
             var linea ='insert into reserva(dia,comensales,hora,salon,nombre,apellido,telefono,email,turno,estado) values(\''
             +req.body.fecha+'\',' +req.body.personas+',\''
             +req.body.hora+'\',\'' +req.body.salon+'\',\''
             +req.body.nombre+'\',\'' +req.body.apellido+'\','
             +req.body.telefono+',\'' +req.body.email+'\',\''
             +req.body.turno +'\',\'ACTIVA\')'
             ;
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                        user: 'sebastianbatalla1@gmail.com',
                        pass:'Asturias12@',
                        clientId: '72832737338-inmg3em2ckgsm0evi7a57rfidpie1n7p.apps.googleusercontent.com',
                        clientSecret: 'uwHCnJITT7o_eLzukSJ086l4',
                        refreshToken: '1/SX2ogAlPMjN_XS74-LLQWIEPsTe3HGXb3DYiU_cilCA'
                }
             })
             
             var mailOptions = {
                from: 'sebastianbatalla1@gmail.com',
                to: req.body.email,
                subject: 'Parrilla Nelly - Reserva confirmada',
               // text: ,
                html: 'Fecha reservación: '+req.body.fecha+'<br>'+
                'Turno: '+req.body.turno+'<br>'+
                'Horario: '+req.body.hora+'<br>'+
                'Cantidad comensales: '+req.body.personas+'<br>'+
                'Salón: '+req.body.salon+'<br>'+
                '<br>'+
                'Recuerde que existe una tolerancia maxima de 15 minutos'
             }
             transporter.sendMail(mailOptions, function (err, res) {
                if(err){
                    console.log('Error');
                } else {
                    console.log('Email Sent');
                }
             })
 
             console.log("sending email", mailOptions);
              transporter.sendMail(mailOptions, function (error, info) {
             console.log("senMail returned!");
              if (error) {
                console.log("ERROR!!!!!!", error);
              } else {
                   console.log('Email sent: ' + info.response);
               }
               });
             
            console.log(linea);
            connection.query(linea,(err,result)=>{
               if(err) throw err;
               console.log('1 fila insertada');
               connection.query('select max(id_reserva) as max from reserva',(err,result,fields)=>{
                  if(err) throw err;
                  console.log(result[0].max);
                 resta=resta-req.body.personas;
                  var actualizacion_comensales='UPDATE turno SET resta='+resta+' WHERE dia=\''+req.body.fecha+'\' AND turno=\''+req.body.turno+'\' AND id_salon=\''+id_salon+'\'';
                  console.log(actualizacion_comensales);
                  connection.query(actualizacion_comensales,(err,result)=>{
                  });
                  var response = {
                     status  : 200,
                     success : 'Updated Successfully',
                     id_reserva: result[0].max
                 }
                  res.end(JSON.stringify(response));
         
               });
            });
            
                }
             }
             );
          }
    });
    
 });
 
  rutas.get('/horariosTotal',(req,res,next)=>{
    var linea='select * from horario';
    console.log('/horarios'+linea);
       connection.query(linea,function(err,rows,fields){
         res.send(rows);
       });
      });
 
  rutas.get('/horarios',(req,res,next)=>{
     var linea='select * from salon s '+
     'inner join turno t ON t.id_salon=S.id_salon '+
     'inner join horario h on h.id_turno=T.id_turno '+
     'where s.nombre=\''+req.query.salon+'\' and t.dia=\''+req.query.fecha+'\' and turno=\''+req.query.turno+'\'';
     console.log('/horarios'+linea);
        connection.query(linea,function(err,rows,fields){
          res.send(rows);
        });
       });  
  rutas.get('/comprobar_comensales',(req,res,next)=>{
    var aux=req.query.fecha;
    var parts =aux.split('-');
 var d  = new Date(parts[0], parts[1] - 1, parts[2]); 
var weekday = new Array(7);
 weekday[0] = "domingo";
 weekday[1] = "lunes";
 weekday[2] = "martes";
 weekday[3] = "miercoles";
 weekday[4] = "jueves";
 weekday[5] = "viernes";
 weekday[6] = "sabado";
 var n = weekday[d.getDay()]+'_'+req.query.turno;
 console.log('fecha'   +d.getFullYear()+d.getMonth()+'    '+d.getDay());
    var linea='select * from feriado WHERE dia=\''+req.query.fecha+'\' and turno=\''+req.query.turno+'\'';
    console.log('/feriado '+linea);
       connection.query(linea,function(err,result,fields){
          if(result[0] == null){
             var linea2='select * from comensales_turno WHERE dia=\''+n+'\' ';
             console.log('/comensales_turno '+linea2);
              connection.query(linea2,function(err2,result2,fields){  
             res.send(result2);
               });
          }else{
             res.send(result);
          }
       });
 });

 rutas.post('/reservas',(req,res,next)=>{
    var lineaBusq= 'select count(1) as countBusq  from reserva where ((email=\''+req.body.email+'\' or telefono='+req.body.telefono+') and dia=\''
    +req.body.fecha+'\''+' and turno=\''+req.body.turno+'\')';
    console.log(lineaBusq);
    connection.query(lineaBusq,(err,resultBusq)=>{
       console.log(resultBusq[0].countBusq);
          if(resultBusq[0].countBusq != 0){
             var response = {
                status  : 400,
                success : 'El usuario ya posee una reserva en mismo dia y turno.',
               
            }
             res.end(JSON.stringify(response));
          }else{
             var resta =0;var id_salon=-2;
             // levantar resta de turno y compararlo contra comensales de reserva nueva
             var lineaTurno='SELECT sum(t.resta) as resta,S.id_salon AS id_salon  FROM TURNO T'+
             ' INNER JOIN salon S ON T.id_salon=S.id_salon WHERE T.dia=\''+req.body.fecha+'\' AND T.turno=\''+req.body.turno+'\' AND S.nombre=\''+req.body.salon+'\'';
             console.log(lineaTurno);
             connection.query(lineaTurno,(err,resultTurno)=>{
                if(err) throw err;
                console.log(resultTurno[0].resta +' < '+req.body.personas);
                if((resultTurno[0].resta)!=null){
                      resta =resultTurno[0].resta ;
                      id_salon=resultTurno[0].id_salon ;
                }
                if(resta < req.body.personas){
                   var msj= 'No tenemos lugar en el salon seleccionado. Proba con otro salon !';
                   var response = {
                      status  : 600,
                      success : msj,
                      
                  }
                   res.end(JSON.stringify(response));
                }else{
                     // en caso error, devolver status.
             // en caso correcto, levantar max_comensales de feriado segun dia, en caso de no estar ahi, levantar de 
             // max_comensales de comensales_dias
             // en caso de que la cantidad de comensales requerido exceda el permitido, devolver status
             //y desde jquery decir el error.
             var linea ='insert into reserva(dia,comensales,hora,salon,nombre,apellido,telefono,email,turno,estado) values(\''
             +req.body.fecha+'\','
             +req.body.personas+',\''
             +req.body.hora+'\',\''
             +'arriba\',\''
             +req.body.nombre+'\',\''
             +req.body.apellido+'\','
             +req.body.telefono+',\''
             +req.body.email+'\',\''
             +req.body.turno
             +'\',\'ACTIVA\')'
             ;
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                        user: 'sebastianbatalla1@gmail.com',
                        pass:'Asturias12@',
                        clientId: '72832737338-inmg3em2ckgsm0evi7a57rfidpie1n7p.apps.googleusercontent.com',
                        clientSecret: 'uwHCnJITT7o_eLzukSJ086l4',
                        refreshToken: '1/SX2ogAlPMjN_XS74-LLQWIEPsTe3HGXb3DYiU_cilCA'
                }
             })
             
             var mailOptions = {
                from: 'sebastianbatalla1@gmail.com',
                to: req.body.email,
                subject: 'Parrilla Nelly - Reserva confirmada',
               // text: ,
                html: 'Fecha reservación: '+req.body.fecha+'<br>'+
                'Turno: '+req.body.turno+'<br>'+
                'Horario: '+req.body.hora+'<br>'+
                'Cantidad comensales: '+req.body.personas+'<br>'+
                'Salón: '+req.body.salon+'<br>'+
                '<br>'+
                'Recuerde que existe una tolerancia maxima de 15 minutos'
             }
             transporter.sendMail(mailOptions, function (err, res) {
                if(err){
                    console.log('Error');
                } else {
                    console.log('Email Sent');
                }
             })
 
             console.log("sending email", mailOptions);
              transporter.sendMail(mailOptions, function (error, info) {
             console.log("senMail returned!");
              if (error) {
                console.log("ERROR!!!!!!", error);
              } else {
                   console.log('Email sent: ' + info.response);
               }
               });
             
          
            connection.query(linea,(err,result)=>{
               if(err) throw err;
               console.log('1 fila insertada');
               connection.query('select max(id_reserva) as max from reserva',(err,result,fields)=>{
                  if(err) throw err;
                  console.log(result[0].max);
                 resta=resta-req.body.personas;
                  var actualizacion_comensales='UPDATE turno SET resta='+resta+' WHERE dia=\''+req.body.fecha+'\' AND turno=\''+req.body.turno+'\' AND id_salon=\''+id_salon+'\'';
                  console.log(actualizacion_comensales);
                  connection.query(actualizacion_comensales,(err,result)=>{
                  });
                  var response = {
                     status  : 200,
                     success : 'Updated Successfully',
                     id_reserva: result[0].max
                 }
                  res.end(JSON.stringify(response));
         
               });
            });
            
                }
             }
             );
          }
    });
    
 });
  module.exports=rutas;