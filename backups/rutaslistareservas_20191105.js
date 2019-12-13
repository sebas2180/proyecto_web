
const nodemailer = require('nodemailer')  ;
const dbConnection  = require('./conexionMySql');
var connection;
connection = dbConnection.dbConnection();

function lista_rutas(app,passport){
    
    //
    app.get('/traer_reservas_sinFecha',(req,res,next)=>{
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
    app.get('/traer_reservas_sinFecha_todas',(req,res,next)=>{
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
      app.get('/traer_reservas_por_codigo',(req,res,next)=>{
       if(req.query.codigo!=''){
        const linea = 'SELECT * FROM reserva WHERE  id_reserva='+req.query.codigo;
        console.log(linea);
        connection.query(linea,(err,result)=>{
            if(err) throw err;
             res.send(result);
        });
       }
    });
    
      ///
    app.get('/traer_reservas_conFecha',(req,res,next)=>{
        const linea = 'SELECT * FROM reserva WHERE estado=\''+req.query.estado+'\' and dia=\''+req.query.fecha+'\'';
        console.log(linea);
        connection.query(linea,(err,result)=>{
            if(err) throw err;
             res.send(result);
        });
    
    });
    ///
    app.get('/traer_reservas_conFecha_todas',(req,res,next)=>{
        const linea = 'SELECT * FROM reserva WHERE dia=\''+req.query.fecha+'\'';
        console.log(linea);
        connection.query(linea,(err,result)=>{
            if(err) throw err;
             res.send(result);
        });
    
    });
    ///
    app.post('/anular_reserva',(req,res,next)=>{
        console.log('hola');
        var linea = 'UPDATE reserva SET estado=\'anulada\',fecha_cancelacion=\''
                             +req.body.fecha_cancelacion
                              +'\' where id_reserva='
                                +req.body.id_reserva;
        console.log(linea);
        connection.query(linea,(err,result)=>{
            if(err) throw err;
            var msj= 'Cancelacion exitosa';
            
            res.end(JSON.stringify(result));
        });
    
    });
    ///
    app.post('/confirmar_reserva_llegada',(req,res,next)=>{
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
    app.get('/traer_estadisticas',(req,res,next)=>{
   
        var linea = 'SELECT turno,sum(resta) As capacidad_restante FROM turno where dia=\''
                                +req.query.fecha+'\' group by turno';
        console.log('linea traer estadisticas'+linea);
        connection.query(linea,(err,result)=>{
            if(err) throw err;
            var msj= 'Confirmacion exitosa';
            var response = {
               status  : 610,
               success : msj,
            }
            res.send(result);
        });
    
    });
    app.get('/insertar_horarios',(req,res,next)=>{
        var linea0 ='select * from salon';
        console.log('linea 0: '+linea0);
        connection.query(linea0,(err6,r1)=>{
            if(err6) throw err6;
            var linea='select * from lista_horas_set';
            console.log(linea);
                        connection.query(linea,(err2,r2)=>{
                            if(err2) throw err2;
                            r1.forEach(e1 => {
                                r2.forEach(e2 => {
                                    var id=e1.id_salon;
                                    var linea1='insert into turno(id_salon,turno,resta,dia) SELECT '+id+',\''+e2.turno+'\','+e1.capacidad+',\''+req.query.fecha+'\''+
                                    'WHERE NOT EXISTs(SELECT '+id+',\''+e2.turno+'\','+e1.capacidad+',\''+req.query.fecha+'\''+
                                    ' FROM turno t WHERE t.id_salon='+id+' AND t.turno=\''+e2.turno+'\' AND t.dia=\''+req.query.fecha+'\')';
                                  
                                    connection.query(linea1,(err9,result)=>{
                                        if(err9) throw err9;
                                        var lineaMAX ='select max(id_turno) as max,turno from turno';
                          
                                    connection.query(lineaMAX ,(err,r3)=>{
                                        if(err) throw err;
                                    r3.forEach(e3 => {
                                        var linea5='select * from lista_horas_set where turno=\''+e3.turno+'\'';
                                        console.log(linea5);
                                        connection.query(linea5,(err5,r5)=>{
                                            if(err5) throw err5;
                                            r5.forEach(e5 => {
                                                var hora1='INSERT INTO horario(id_turno,hora) SELECT  '+e3.max+',\''+e5.hora+'\' '+
                                                'WHERE NOT EXISTS (SELECT id_turno,hora FROM horario WHERE id_turno= '+e3.max+' and hora=\''+e5.hora+'\')';
                                       
                                        connection.query(hora1,(err1,res)=>{
                                            if(err1) throw err1;
                                        });
                                            });
                                        });
                                        
                                });
                                    });
                                });
    
                            });
                           
                            });
                        });
        });
        console.log('okkkk');
        return res.end();
    });   
}
////

module.exports=lista_rutas;