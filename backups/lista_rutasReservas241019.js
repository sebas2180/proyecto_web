const express = require('express');
const lista_rutas = express();
const path= require('path');
var bcrypt = require('bcryptjs');
lista_rutas.use(express.static(path.join(__dirname,'public')));
const nodemailer = require('nodemailer')  ;
///con estas 3 lineas uso el modulo conexionMySql
const dbConnection  = require('./conexionMySql');
var connection;
var salt = bcrypt.genSaltSync(10);
connection = dbConnection.dbConnection();


lista_rutas.post('/login_soloUsuario',(req,res,next)=>{
    const linea1 = 'SELECT  count(1) as resultado FROM empleados WHERE usuario=\''+req.body.usuario+'\'';
    console.log(linea1);
    connection.query(linea1,(err,resultado)=>{
        if(err) throw err;
        if(resultado[0].resultado == 0){
            console.log('usurio no exite');
            var data = {
                status: 700,
                msj: 'El usuario no existe'
            }
        res.end(JSON.stringify(data));
        }else{
            if(err) throw err;
            if(resultado[0].resultado== 1){
                console.log('usurio si exite');
                var data={
                    status: 701,
                    msj:'Usuario encontrado'
             }
            res.end(JSON.stringify(data));
            }
            
        }
    })

});
//
lista_rutas.get('/traer_reservas_sinFecha',(req,res,next)=>{
  console.log(req.query.estado);
    if(req.query.salon =='Seleccionar' && req.query.turno =='Seleccionar' &&  req.query.codigo== '' ){
        console.log('// salon no, turno no, codigo no');
        const linea = 'SELECT * FROM reserva WHERE estado=\''+req.query.estado+'\'';
        console.log(linea);
        connection.query(linea,(err,result)=>{
            if(err) throw err;
             res.send(result);
        });
    }else{ // salon si, turno no, codigo no
        if(req.query.salon !='Seleccionar' && req.query.turno == 'Seleccionar'&&  req.query.codigo=='' ){
            const linea = 'SELECT * FROM reserva WHERE estado=\''+req.query.estado+'\' and salon=\''+req.query.salon+'\'';
            console.log(linea);
            connection.query(linea,(err,result)=>{
                if(err) throw err;
                 res.send(result);
            });
        }else{ // salon no, turno si, codigo no
            if(req.query.salon =='Seleccionar' && req.query.turno != 'Seleccionar'  &&  req.query.codigo=='' ){
                const linea = 'SELECT * FROM reserva WHERE estado=\''+req.query.estado+'\' and  turno=\''+req.query.turno+'\'';
                console.log(linea);
                connection.query(linea,(err,result)=>{
                    if(err) throw err;
                     res.send(result);
                });
            }else{ // salon si, turno si, codigo no
                if(req.query.salon !='Seleccionar' && req.query.turno != 'Seleccionar'  &&  req.query.codigo=='' ){
                    const linea = 'SELECT * FROM reserva WHERE estado=\''+req.query.estado+'\' and  turno=\''+req.query.turno+'\' and salon=\''+req.query.salon+'\'';
                    console.log(linea);
                    connection.query(linea,(err,result)=>{
                        if(err) throw err;
                         res.send(result);
                    });
                }else{
                     // salon si, turno si, codigo si
                    if(req.query.salon !='Seleccionar' && req.query.turno != 'Seleccionar'   &&  req.query.codigo!=null){
                        const linea = 'SELECT * FROM reserva WHERE estado=\''+req.query.estado+'\' and  turno=\''+req.query.turno+'\' and salon=\''+req.query.salon+'\' and'+
                        ' id_reserva=\''+req.query.codigo+'\'';
                        console.log(linea);
                        connection.query(linea,(err,result)=>{
                            if(err) throw err;
                             res.send(result);
                        });
                    }else{
                         // salon no, turno si, codigo si
                    if(req.query.salon !='Seleccionar' && req.query.turno != 'Seleccionar' &&  req.query.codigo!=null ){
                        const linea = 'SELECT * FROM reserva WHERE estado=\''+req.query.estado+'\' and  turno=\''+req.query.turno+'\'  and'+
                        ' id_reserva=\''+req.query.codigo+'\'';
                        console.log(linea);
                        connection.query(linea,(err,result)=>{
                            if(err) throw err;
                             res.send(result);
                        });
                    }else{
                            // salon si, turno no, codigo si
                    if(req.query.salon !='Seleccionar' && req.query.turno != 'Seleccionar'   &&  req.query.codigo!=null){
                        const linea = 'SELECT * FROM reserva WHERE estado=\''+req.query.estado+'\' and  salon=\''+req.query.salon+'\'  and'+
                        ' id_reserva=\''+req.query.codigo+'\'';
                        console.log(linea);
                        connection.query(linea,(err,result)=>{
                            if(err) throw err;
                             res.send(result);
                        });
                    }else{
                        console.log(' // salon no, turno no, codigo si'+req.query.salon+'   '+ req.query.turno+'    '+req.query.codigo);
                        if(req.query.salon =='Seleccionar' && req.query.turno == 'Seleccionar' && req.query.codigo!=null){
                            const linea = 'SELECT * FROM reserva WHERE estado=\''+req.query.estado+'\' and  id_reserva='+req.query.codigo;
                            console.log(linea);
                            connection.query(linea,(err,result)=>{
                                if(err) throw err;
                                 res.send(result);
                            });
                        }
                    }
                    }
                    }
                }   
            }
        }
    }
});
///
lista_rutas.get('/traer_reservas_sinFecha_todas',(req,res,next)=>{
    console.log(req.query.estado);
      if(req.query.salon =='Seleccionar' && req.query.turno =='Seleccionar' &&  req.query.codigo== '' ){
          console.log('// salon no, turno no, codigo no');
          const linea = 'SELECT * FROM reserva';
          console.log(linea);
          connection.query(linea,(err,result)=>{
              if(err) throw err;
               res.send(result);
          });
      }else{ // salon si, turno no, codigo no
          if(req.query.salon !='Seleccionar' && req.query.turno == 'Seleccionar'&&  req.query.codigo=='' ){
              const linea = 'SELECT * FROM reserva WHERE salon=\''+req.query.salon+'\'';
              console.log(linea);
              connection.query(linea,(err,result)=>{
                  if(err) throw err;
                   res.send(result);
              });
          }else{ // salon no, turno si, codigo no
              if(req.query.salon =='Seleccionar' && req.query.turno != 'Seleccionar'  &&  req.query.codigo=='' ){
                  const linea = 'SELECT * FROM reserva WHERE turno=\''+req.query.turno+'\'';
                  console.log(linea);
                  connection.query(linea,(err,result)=>{
                      if(err) throw err;
                       res.send(result);
                  });
              }else{ // salon si, turno si, codigo no
                  if(req.query.salon !='Seleccionar' && req.query.turno != 'Seleccionar'  &&  req.query.codigo=='' ){
                      const linea = 'SELECT * FROM reserva WHERE  turno=\''+req.query.turno+'\' and salon=\''+req.query.salon+'\'';
                      console.log(linea);
                      connection.query(linea,(err,result)=>{
                          if(err) throw err;
                           res.send(result);
                      });
                  }else{
                       // salon si, turno si, codigo si
                      if(req.query.salon !='Seleccionar' && req.query.turno != 'Seleccionar'   &&  req.query.codigo!=null){
                          const linea = 'SELECT * FROM reserva WHERE  turno=\''+req.query.turno+'\' and salon=\''+req.query.salon+'\' and'+
                          ' id_reserva=\''+req.query.codigo+'\'';
                          console.log(linea);
                          connection.query(linea,(err,result)=>{
                              if(err) throw err;
                               res.send(result);
                          });
                      }else{
                           // salon no, turno si, codigo si
                      if(req.query.salon !='Seleccionar' && req.query.turno != 'Seleccionar' &&  req.query.codigo!=null ){
                          const linea = 'SELECT * FROM reserva WHERE  turno=\''+req.query.turno+'\'  and'+
                          ' id_reserva=\''+req.query.codigo+'\'';
                          console.log(linea);
                          connection.query(linea,(err,result)=>{
                              if(err) throw err;
                               res.send(result);
                          });
                      }else{
                              // salon si, turno no, codigo si
                      if(req.query.salon !='Seleccionar' && req.query.turno != 'Seleccionar'   &&  req.query.codigo!=null){
                          const linea = 'SELECT * FROM reserva salon=\''+req.query.salon+'\'  and'+
                          ' id_reserva=\''+req.query.codigo+'\'';
                          console.log(linea);
                          connection.query(linea,(err,result)=>{
                              if(err) throw err;
                               res.send(result);
                          });
                      }else{
                          console.log(' // salon no, turno no, codigo si'+req.query.salon+'   '+ req.query.turno+'    '+req.query.codigo);
                          if(req.query.salon =='Seleccionar' && req.query.turno == 'Seleccionar' && req.query.codigo!=null){
                              const linea = 'SELECT * FROM reserva WHERE  id_reserva='+req.query.codigo;
                              console.log(linea);
                              connection.query(linea,(err,result)=>{
                                  if(err) throw err;
                                   res.send(result);
                              });
                          }
                      }
                      }
                      }
                  }   
              }
          }
      }
  });
  ///
lista_rutas.get('/traer_reservas_conFecha',(req,res,next)=>{
    const linea = 'SELECT * FROM reserva WHERE estado=\''+req.query.estado+'\' and dia=\''+req.query.fecha+'\'';
    console.log(linea);
    connection.query(linea,(err,result)=>{
        if(err) throw err;
         res.send(result);
    });

});
///
lista_rutas.get('/traer_reservas_conFecha_todas',(req,res,next)=>{
    const linea = 'SELECT * FROM reserva WHERE dia=\''+req.query.fecha+'\'';
    console.log(linea);
    connection.query(linea,(err,result)=>{
        if(err) throw err;
         res.send(result);
    });

});
///
lista_rutas.post('/anular_reserva',(req,res,next)=>{
    console.log('hola');
    var linea = 'UPDATE reserva SET estado=\'anulada\',fecha_cancelacion=\''
                         +req.body.fecha_cancelacion
                          +'\' where id_reserva='
                            +req.body.id_reserva;
    console.log(linea);
    connection.query(linea,(err,result)=>{
        if(err) throw err;
        var msj= 'Cancelacion exitosa';
        var response = {
           status  : 600,
           success : msj,
        }
        res.end(JSON.stringify(response));
    });

});
///
lista_rutas.post('/confirmar_reserva_llegada',(req,res,next)=>{
    console.log('hola manola');
    var linea = 'UPDATE reserva SET estado=\'finalizada\' where id_reserva='
                            +req.body.id_reserva;
    console.log(linea);
    connection.query(linea,(err,result)=>{
        if(err) throw err;
        var msj= 'Confirmacion exitosa';
        var response = {
           status  : 601,
           success : msj,
        }
        res.end(JSON.stringify(response));
    });

});
///
lista_rutas.post('/login',(req,res,next)=>{
    const linea0 = 'SELECT  count(1) as resultado FROM empleados WHERE usuario=\''+req.body.usuario+'\' and password=\''+req.body.password+'\'';

    console.log(linea0);
    connection.query(linea0,(err,resultado)=>{
        if(err) throw err;
        if(resultado[0].resultado == 0){
            console.log('contraseña invalida');
            var data = {
                status: 702,
                msj: 'Contraseña invalida'
            }
            res.end(JSON.stringify(data));
        }else{
            if(resultado[0].resultado == 1){
                console.log('contraseña valida');
                var data={
                    status: 703,
                    msj:'Logeo exitoso'
                }
            res.end(JSON.stringify(data));
                }
        }
    })

});


module.exports=lista_rutas;