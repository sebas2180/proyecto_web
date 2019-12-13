const moment = require('moment');
const dbConnection  = require('./conexionMySql');
var connection;
connection = dbConnection.dbConnection();
const nodemailer = require('nodemailer')  ;
function rutas(app,passport){
    app.get('/dias_especiales',(req,res,next)=>{
        res.render('../views/dias_especiales');
    });

    app.get('/traer_dias_especiales',(req,res,next)=>{
        var hoy = new Date();

        console.log(hoy.toLocaleDateString());
        const linea0 ="Select * from feriado where dia>=\'"+hoy.toLocaleDateString()+"\'";
        console.log(linea0);
       connection.query(linea0,(err,result)=>{
           if(err) throw err;
           res.send(result);
       });
    app.post('/existen_reservas_dia',(req,res,next)=>{
        var linea2= 'SELECT count(*) as cantidad FROM reserva WHERE dia=\''+req.body.fecha+'\' AND turno=\''+req.body.turno+'\'';
        connection.query(linea2,(err2,result1)=>{
            if(err2) throw err2;
           console.log('result1.cantidad:   '+result1.cantidad);
            result1.forEach(element => {
                if(element.cantidad >0){
                    console.log('encontrado reservas');
                    var response = {
                        status : 520,
                        msj : 'Existen reserva en este turno. Desea proceder y emitir alerta de modificacion de horario a los clientes?',
                    }
                    res.send((response));
                }else{
                    var response = {
                        status : 521,
                        msj : 'Existen reserva en este turno. Desea proceder y emitir alerta de modificacion de horario a los clientes?',
                    }
                    res.send((response));
                }
            });
        });
    });
    app.post('/set_dia_especial',(req,res,next)=>{
        var linea3='DELETE  FROM feriado WHERE dia=\''+req.body.fecha+'\' AND turno=\''+req.body.turno+'\'';
        console.log(linea3);
        connection.query(linea3,(err4,next)=>{
                if(err4) throw err4;
        });

        var linea5='SELECT id_turno from turno WHERE dia=\''+req.body.fecha+'\' AND turno=\''+req.body.turno+'\'';
        console.log(linea5);
        connection.query(linea5,(err5,res5)=>{
            res5.forEach(e5 => {
                var linea6='DELETE FROM horario where id_turno='+e5.id_turno;
                connection.query(linea6,(err6)=>{
                    console.log('borrado exitoso');
                });
            });
        });
        // seguramente deba buscar en reservas, filtrando por dia y turno, obtener el mail y con eso
         // enviar mail avisando que cambio limite de horario
                var aux=req.body.hora;
                var aux1= aux.substring(0,2)+""+aux.substring(3,5);
                var linea1 = "INSERT INTO feriado(dia,max_comensales,turno,codigo_hora) values(\'"+
                req.body.fecha+"\',"+
                req.body.comensales+",\'"+req.body.turno+"\',"+aux1+")";
                console.log(linea1);
                connection.query(linea1,(err,next)=>{
                if(err) throw err;
                var response={
                status:850,
                msj:'Guardado exitoso'
                }
                res.end(JSON.stringify(response));
                } );
                
    });
    app.post('/mandar_notificacion',(req,res,next)=>{

        var linea0= 'SELECT * FROM RESERVA WHERE dia=\''+req.body.fecha+'\' AND turno=\''+req.body.turno+'\'';
        console.log('Control linea0'+linea0);
        connection.query(linea0,(err0,res0)=>{
            if(err0) throw err0;
           
            var hay_error=enviar_email(req.body.hora,res0);
            if(!hay_error){
                console.log('bucle 1 de enviado');
                var response={
                    status: 555,
                    msj:'El preceso de enviado fue exitoso'
                }
               
            }else{
                    console.log('bucle 2 de enviado');
                    var response={
                        status: 556,
                        msj:'Hubo un error al enviar mail de notificacion'
                    }
            }
            res.send((response));
        });
    });
    });
    function enviar_email(horaa,res0){
        var hay_error=false;
        res0.forEach(e0 => {
            is_bucle=true;
            var hora=e0.hora.substring(0,2)+''+e0.hora.substring(3,5);
            var aux=horaa;
            var horaReq=aux.substring(0,2) +''+aux.substring(3,5);
            console.log('hora:    '+hora+'     req.hora:  '+horaReq);
           if(hora>horaReq){
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
             var asunto_email='Parrilla Nelly - reserva nro'+e0.id_reserva+' - El horario de reserva fue modificado';
             var mailOptions = {
                from: 'sebastianbatalla1@gmail.com',
                to: e0.email,
                subject: asunto_email,
                html: 'El horario limite de reserva número:'+e0.id_reserva+' ha sido modificado.  Le acercamos'+
                '  el nuevo horario limite de llegada:'+
                'Fecha reservación: '+e0.dia+'<br>'+
                'Turno: '+e0.turno+'<br>'+
                'Nuevo horario: '+hora+'<br>'+
                'Cantidad comensales: '+e0.comensales+'<br>'+
                'Salón: '+e0.salon+'<br>'+
                '<br>'+
                'Recuerde que existe una tolerancia maxima de 15 minutos'+
                'Disculpe las molestias y muchas gracias.'
             }

             console.log("sending email", mailOptions);
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("Error al enviar mail de modificacion!!!!!!", error);
                    hay_error =  true;
                } 
                console.log("senMail returned!");
                mail_enviado=true;
                var linea1='UPDATE reserva SET hora=\''+horaa+'\' WHERE id_reserva='+e0.id_reserva;
                connection.query(linea1,(err1)=>{
                    if(err1) throw err1;
                    hay_error= false;
                });
            });
           }
        });
            return hay_error;
        
    }
};
module.exports=rutas;