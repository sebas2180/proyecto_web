
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
        var encontrado=true;
        var linea12 = 'SELECT * FROM feriado where dia=\''+req.query.fecha+'\' and turno=\''+req.query.turno+'\'';
        console.log('linea12:     '+linea12);
        connection.query(linea12,(err12,res12)=>{
            res12.forEach(e12 => {
                if(err12) throw err12;
                encontrado=false;
                console.log('----------------------------------------------------');
                console.log(' ES FERIADO  --------------');
                var linea0 ='select * from salon';
                console.log('linea 0: '+linea0);
                connection.query(linea0,(err1,r1)=>{
                    if(err1) throw err1;
                    r1.forEach(e1 => {
                        var linea10='DELETE h FROM horario h INNER JOIN turno t ON t.id_turno=h.id_turno WHERE t.dia=\''+req.query.fecha+'\' and t.turno=\''+req.query.turno+'\'';
                        console.log(linea10);
                        connection.query(linea10,(err10)=>{ 
                            if(err10) throw err10;
                        });
                        var linea1='select * from lista_horas_set WHERE codigo_hora='+e12.codigo_hora;
                        console.log(linea1);
                        connection.query(linea1,(err2,r2)=>{
                            r2.forEach(e2 => {
                                if(err2) throw err2;
                                var linea2='insert into turno(id_salon,turno,resta,dia) SELECT '+e1.id_salon+',\''+e2.turno+'\','+e1.capacidad+',\''+req.query.fecha+'\''+
                                'WHERE NOT EXISTs(SELECT '+e1.id_salon+',\''+e2.turno+'\','+e1.capacidad+',\''+req.query.fecha+'\''+
                                ' FROM turno t WHERE t.id_salon='+e1.id_salon+' AND t.turno=\''+e2.turno+'\' AND t.dia=\''+req.query.fecha+'\')';
                                connection.query(linea2,(err3,r3)=>{
                                if(err3) throw err3;
                            });
                            });
                        });
                        var linea3 ='select * from turno where dia=\''+req.query.fecha+'\'';
                        console.log(linea3);
                            connection.query(linea3,(err4,r4)=>{
                                r4.forEach(e4 => {
                                    var linea4='select * from lista_horas_set where turno=\''+e4.turno+'\' AND codigo_hora=\''+e12.codigo_hora+'\'';
                                connection.query(linea4,(err5,r5)=>{
                                    r5.forEach(e5 => {
                                        //
                                    var linea5='INSERT INTO horario(id_turno,hora) SELECT  '+e4.id_turno+',\''+e5.hora+'\' '+
                                    'WHERE NOT EXISTS (SELECT id_turno,hora FROM horario WHERE id_turno= '+e4.id_turno+' and hora=\''+e5.hora+'\')';
                           
                                     connection.query(linea5,(err6,r6)=>{
                                    if(err6) throw err6;
                                    });
                                    });
                                });
                                });
                            });
                    });
                });    
            });
            if(encontrado){  
                console.log('-------------------------------------------------------------------');
                console.log('NO ES DERIADO');
                var linea10='DELETE h FROM horario h INNER JOIN turno t ON t.id_turno=h.id_turno WHERE t.dia=\''+req.query.fecha+'\' and t.turno=\''+req.query.turno+'\'';
                console.log(linea10);
                connection.query(linea10,(err10)=>{ 
                    if(err10) throw err10;
                });
        
                var linea0 ='select * from salon';
                console.log('linea 0: '+linea0);
                connection.query(linea0,(err1,r1)=>{
                    if(err1) throw err1;
                    r1.forEach(e1 => {
                        var linea1='select * from lista_horas_set';
                        connection.query(linea1,(err2,r2)=>{
                            r2.forEach(e2 => {
                                if(err2) throw err2;
                                var linea2='insert into turno(id_salon,turno,resta,dia) SELECT '+e1.id_salon+',\''+e2.turno+'\','+e1.capacidad+',\''+req.query.fecha+'\''+
                                'WHERE NOT EXISTs(SELECT '+e1.id_salon+',\''+e2.turno+'\','+e1.capacidad+',\''+req.query.fecha+'\''+
                                ' FROM turno t WHERE t.id_salon='+e1.id_salon+' AND t.turno=\''+e2.turno+'\' AND t.dia=\''+req.query.fecha+'\')';
                                connection.query(linea2,(err3,r3)=>{
                                if(err3) throw err3;
                            });
                            });
                        });
                        var linea3 ='select * from turno where dia=\''+req.query.fecha+'\'';
                        console.log(linea3);
                            connection.query(linea3,(err4,r4)=>{
                                r4.forEach(e4 => {
                                    var linea4='select * from lista_horas_set where turno=\''+e4.turno+'\' AND codigo_hora=0';
                                connection.query(linea4,(err5,r5)=>{
                                    r5.forEach(e5 => {
                                        //
                                    var linea5='INSERT INTO horario(id_turno,hora) SELECT  '+e4.id_turno+',\''+e5.hora+'\' '+
                                    'WHERE NOT EXISTS (SELECT id_turno,hora FROM horario WHERE id_turno= '+e4.id_turno+' and hora=\''+e5.hora+'\')';
                           
                                     connection.query(linea5,(err6,r6)=>{
                                    if(err6) throw err6;
                                    });
                                    });
                                });
                                });
                            });
                    });
                });
            }
        });

        console.log('okkkk');
        return res.end();
    });   
    app.post('/set_mesa',(req,res,next)=>{
        var linea1 = 'SELECT * FROM reserva WHERE id_reserva='+req.body.id_reserva;
        console.log(linea1);
        connection.query(linea1,(err1,res1)=>{
           res1.forEach(e1 => {
           var linea0= 'SELECT count(1) as contador from reserva WHERE dia=\''+e1.dia+'\' AND turno=\''+e1.turno+'\' AND mesa='+req.body.nro_mesa;
           console.log(linea0);
           connection.query(linea0,(err0,res0)=>{
           var response;
           console.log(res0[0].contador);
           if(res0[0].contador == 0 ){
            console.log('hay cero registros');
            var linea10= 'UPDATE reserva set mesa='+req.body.nro_mesa+' WHERE id_reserva='+req.body.id_reserva;
            console.log(linea10);
            connection.query(linea10,(err10,result)=>{
            if(err10) throw err10;
                response = {
                status: 557,
                msj: 'Mesa asignada correctamente!'
                }
                console.log(response);
                res.send((response));
            });
           }else{
            console.log('hay mas de 1 registro');
            response = {
              status: 558,
              msj: "existen coincidencias en este turno y fecha"
              
           }
           res.send((response));
           }
           });
        });
       
           
        });
     });

    }

////

module.exports=lista_rutas;