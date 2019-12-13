var turnoo;
var id_reservaa;
var guardar_ok=false;
$(()=>{
    $('#cont-asignacion').hide();
    $('#cancelar-asignacion').click(()=>{
        $('#cont-asignacion').hide();
    });
    $('#btn-3').click(()=>{
        if($('#codigo').val()!=''){
            $.ajax({
                url:"/traer_reservas_por_codigo",
                type: "get",
                datetype: "json",
                assync: false,
                data:{codigo: $('#codigo').val()},
                success: function(result){
                $('#row-2').empty();
                var i=0;
                armarDiv(result);              
                },
                error: function(){
                    alert('error al descargar el contenido 1');
    
                }
            }).responseText;
        }else{
            alert('Debe ingresar un codigo de reserva');
        }
       
    });
    $('#estado1').change(()=>{
        $('#estado2').val($('#estado1').val());
    });
    $('#estado2').change(()=>{
        $('#estado1').val($('#estado2').val());
    });
    $('#btn-feriados').click(()=>{
        window.location.href='http://localhost:2000/dias_especiales';
    });
    var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var year = ( now.getFullYear());
            var hora = now.getHours();
            var minutos = now.getMinutes();
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
            $("#fecha").val(today);
   traer_reservas_con_fecha(); 

   //traer perfil
    $.ajax({
        url:'/obtener_perfil',
        type: "GET",
        datetype:"json",
        assync: false,
        data:{},
        success:(result)=>{
            $('#id_user').append('<h1>'+result.email+'</h1>')
        },error:()=>{
            alert('error al traer el usuario');
        }
    }).responseText;
   //
   $si=document.querySelector('#si');
   $si.addEventListener('click',()=>{
       $('#filtro_fecha').show();
   });
   $no=document.querySelector('#no');
   $no.addEventListener('click',()=>{
       $('#filtro_fecha').hide();
   });
    $('#cont-3').hide();
    $('#cont-1').hide();
    $('#filtro_fecha').hide();
    const icon_arriba = document.querySelector('#arriba');
    icon_arriba.addEventListener('click',()=>{
        $('#cont-3').hide();
        $('#cont-4').toggle("slow");
        $('#cont-0').toggle("swing");
        $('#cont-1').hide();
    });
    var aux1 = '#abajo';
    const icon_abajo = document.querySelector(aux1);
    icon_abajo.addEventListener('click',()=>{
        $('#cont-4').hide();
        $('#cont-0').hide();
        $('#cont-3').toggle("slow");
        $('#cont-1').toggle("swing");
    });
    const $form = $('#form-filtro');
    $form.submit(e=>{;
        e.preventDefault();
        var salonOk=false,fechaOk=false,turnoOk=false,codigoOk=false;
        const $fecha = $('#fecha').val();
        const $salon = $('#salon').val();
        const $turno = $('#turno').val();
        const $codigo = $('#codigo').val();
        if($salon != 'Seleccionar'){
            salonOk=true;
        }
        if($turno != 'Seleccionar'){
            turnoOk=true;
        }
        if($fecha == 'undefined'){
            fechaOk=true;
        } 
        if(!$("#si").is(':checked')) {
           if($('#estado1').val()!='Todas'){

            $.ajax({
                url:"/traer_reservas_sinFecha",
                type: "get",
                datetype: "json",
                assync: false,
                data:{codigo: $('#codigo').val(), salon:$('#salon').val(), turno:$('#turno').val(),estado:$('#estado1').val()},
                success: function(result){
                $('#row-2').empty();
                var i=0;
                armarDiv(result);              
                },
                error: function(){
                    alert('error al descargar el contenido 2');

                }
            }).responseText;
           }else{

            $.ajax({
                
                url:"/traer_reservas_sinFecha_todas",
                type: "get",
                datetype: "json",
                assync: false,
                data:{codigo: $('#codigo').val(), salon:$('#salon').val(), turno:$('#turno').val()},
                success: function(result){
                $('#row-2').empty();
                var i=0;
                armarDiv(result);              
                },
                error: function(){
                    alert('error al descargar el contenido');

                }
            }).responseText;
           }
        }else{

        }
    })
    $('#btn-fecha').click(e=>{
        llenar_estadisticas();
        e.preventDefault();
        if($("#si").is(':checked')){
          traer_reservas_con_fecha();
        }
        if($("#no").is(':checked')){
            var day = ("0" + now.getDate()).slice(-2);
            var year = ( now.getFullYear());
            var hora = now.getHours();
            var minutos = now.getMinutes();
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
            $("#fecha").val(today);
            traer_reservas_con_fecha();
        }
    });
    $('#btn-salir').click(e=>{
        e.preventDefault();
        $.ajax({
            url:"/logout",
            type:"POST",
            datatype:"json",
            data:{},
            assync:false,
            success:(result)=>{
                alert('Se ha desconectado correctamente!');

                window.location.href=result.substring(1,12);;
            },error:()=>{
                alert('Se ha producido un error en el deslogeo.');
            }
        }).responseText;
    });
    $('#btn_guardar_nro_mesa').click(e=>{
     e.preventDefault();
            $.ajax({
                url:"/set_mesa",
                type:"post",
                datatype:"json",
                assync:false,
                data:{nro_mesa:$('#nro_mesa').val(),id_reserva: id_reservaa},
                success:(result)=>{
                    if(result.status == 557){
                        alert('mesa asignada correctamente!');
                        $('#cont-asignacion').hide();
                    }else{
                        alert('Ops! Otra reserva ya tiene esta mesa asignada');
                    }
                },error:()=>{
                    alert('Ops! Hubo al asignar numero de mesa');
                }
            }).responseText;
        //aqui debo consultar si en reservas de misma fecha y turno, si existe alguna reserva con ese numero de mesa asignado.
        // en caso no de haber, debo realizar un update para darle a esa reserva, ese nro
        // evaluar si hacer una tabla con nros de mesas asignados a salones??
    });
});
function traer_reservas_con_fecha(){
    if($('#estado1').val()=='Todas'){
        $.ajax({
            url:"/traer_reservas_conFecha_todas",
            type: "get",
            datetype: "json",
            assync: false,
            data:{fecha:$('#fecha').val()},
            success: function(result){
            $('#row-2').empty();
            var i=0;
            armarDiv(result);
            },
            error: function(){
                alert('error al descargar el contenido');
    
            }
        }).responseText;
    }else{
        $.ajax({
            url:"/traer_reservas_conFecha",
            type: "get",
            datetype: "json",
            assync: false,
            data:{fecha:$('#fecha').val(),estado: $('#estado1').val()},
            success: function(result){
            $('#row-2').empty();
            var i=0;
            armarDiv(result);
            },
            error: function(){
                alert('error al descargar el contenido 4');
    
            }
        }).responseText;
    } 
    llenar_estadisticas();
}
function llenar_estadisticas(){
    var crearOk=false;
    var existeFecha=crear_horarios();
    if(existeFecha==false){
        $.ajax({
            url:"/insertar_horarios",
            type: "get",
            datetype: "json",
            assync: false,
            data:{fecha:$('#fecha').val()},
            success: function(result){
               crearOk=true;
            },
            error: function(){


                alert('error al descargar el contenido 5');
    
            }
        }).responseText;
        if(crearOk){
            crear_horarios();
        }
    }
}
function armarDiv(result){
    var i=0;
    result.forEach(reserva => {
        if(reserva.estado=='anulada'){
            $('#row-2').append('<div class="col-lg-6 col-md-6 col-xs-12 justify-center" id="reserva-'+0+'">'+
        '<div class="card border-primary">'
        +'<div class="card-header">'
        +'<h3>Dia: '+reserva.dia+'<h3>'
        +'<h3>Turno: '+reserva.turno+'<h3>'
        +'</div>'
        +'<form id="form-"'+i+'>'
        +'<div class="card-body">'
        +'<h1>'+reserva.nombre+' , '+reserva.apellido+'</h1><hr>'
        +'<h2>Codigo de reserva: '+reserva.id_reserva+'</h2>'
        +'<h2>Hora: '+reserva.hora+'</h2><hr>'
        +'<h2>Comensales: '+reserva.comensales+'</h2>'
        +'<h2 id="nombre" value="1">Salon: '+reserva.salon+'</h2><hr>'
        +'<h3>telefono:'+reserva.telefono+'</h3>'
        +'<h3>email:'+reserva.email+'</h3><hr>'
        +'<h3 style="color:red;">estado:'+reserva.estado+'</h3>'
        +'<h3>fecha cancelacion:'+reserva.fecha_cancelacion+'</h3>'
        +'<div class="card-footer">'
        +'</div>'
        +'</form>'
        +'</div>'
        +'</div>'
    +'</div>');
        }else{
            if(reserva.estado=='finalizada'){
                $('#row-2').append('<div class="col-lg-6 col-md-6 col-xs-12 justify-center" id="reserva-'+0+'">'+
            '<div class="card border-primary">'
            +'<div class="card-header">'
            +'<h3>Dia: '+reserva.dia+'<h3>'
            +'<h3>Turno: '+reserva.turno+'<h3>'
            +'</div>'
            +'<form id="form-"'+i+'>'
            +'<div class="card-body">'
            +'<h1>'+reserva.nombre+' , '+reserva.apellido+'</h1>'
            +'<hr>'
            +'<h2>Codigo de reserva: '+reserva.id_reserva+'</h2>'
            +'<h2>Hora: '+reserva.hora+'</h2><hr>'
            +'<h2>Comensales: '+reserva.comensales+'</h2>'
            +'<h2 id="nombre" value="1">Salon: '+reserva.salon+'</h2><hr>'
            +'<h3>telefono:'+reserva.telefono+'</h3>'
            +'<h3>email:'+reserva.email+'</h3><hr>'
            +'<h3 style="color:green;">estado:'+reserva.estado+'</h3>'
            +'<div class="card-footer"><br>'
            +'</div>'
            +'</form>'
            +'</div>'
            +'</div>'
        +'</div>');
            }else{
                if(reserva.mesa== null){
                    $('#row-2').append('<div class="col-lg-6 col-md-6 col-xs-12 justify-center" id="reserva-'+0+'">'+
                    '<div class="card border-primary">'
                    +'<div class="card-header">'
                    +'<h3>Dia: '+reserva.dia+'<h3>'
                    +'<h3>Turno: '+reserva.turno+'<h3>'
                    +'<h3>Mesa: sin mesa asignada<h3>'
                    +'</div>'
                    +'<form id="form-"'+i+'>'
                    +'<div class="card-body">'
                    +'<h1>'+reserva.nombre+' , '+reserva.apellido+'</h1><hr>'
                    +'<h2>Codigo de reserva: '+reserva.id_reserva+'</h2>'
                    +'<h2>Hora: '+reserva.hora+'</h2><hr>'
                    +'<h2>Comensales: '+reserva.comensales+'</h2>'
                    +'<h2 id="nombre" value="1">Salon: '+reserva.salon+'</h2><hr>'
                    +'<h3>telefono:'+reserva.telefono+'</h3>'
                    +'<h3>email:'+reserva.email+'</h3><hr>'
                    +'<h3 style="color:blue;">estado:'+reserva.estado+'</h3>'
                    +'<div class="card-footer">'
                    +'<button type="button" value="asignar"-'+i+'" class="btn btn-warning" id="Asignar-'+i+'" onclick="asignar('+reserva.id_reserva+')"  style="font-size:200%;margin-left:8%;width:15%">Modificar</button>'
                    +'<button type="button" value="modificar-'+i+'" class="btn btn-success" id="confirmar-'+i+'" onClick="confirmar_reserva_llegada('+reserva.id_reserva+')" style="font-size:200%;margin-left:8%;width:15%">Ya llego!</button>'
                    +'<button type="submit" value="anular-'+i+'" class="btn btn-danger" id="anular-'+i+'" onclick="anular('+reserva.id_reserva+')" style="font-size:200%;margin-left:8%;width:15%">ANULAR</button>'
                    +'</div>'
                    +'</form>'
                    +'</div>'
                    +'</div>'
                +'</div>');
                }else{
                    $('#row-2').append('<div class="col-lg-6 col-md-6 col-xs-12 justify-center" id="reserva-'+0+'">'+
                    '<div class="card border-primary">'
                    +'<div class="card-header">'
                    +'<h3>Dia: '+reserva.dia+'<h3>'
                    +'<h3>Turno: '+reserva.turno+'<h3>'
                    +'<h3>Mesa: '+reserva.mesa+'<h3>'
                    +'</div>'
                    +'<form id="form-"'+i+'>'
                    +'<div class="card-body">'
                    +'<h1>'+reserva.nombre+' , '+reserva.apellido+'</h1><hr>'
                    +'<h2>Codigo de reserva: '+reserva.id_reserva+'</h2>'
                    +'<h2>Hora: '+reserva.hora+'</h2><hr>'
                    +'<h2>Comensales: '+reserva.comensales+'</h2>'
                    +'<h2 id="nombre" value="1">Salon: '+reserva.salon+'</h2><hr>'
                    +'<h3>telefono:'+reserva.telefono+'</h3>'
                    +'<h3>email:'+reserva.email+'</h3><hr>'
                    +'<h3 style="color:blue;">estado:'+reserva.estado+'</h3>'
                    +'<div class="card-footer">'
                    +'<button type="button" value="asignar"-'+i+'" class="btn btn-warning" id="Asignar-'+i+'"onclick="asignar('+reserva.id_reserva+')" style="font-size:200%;margin-left:8%;width:15%">Modificar</button>'
                    +'<button type="button" value="confirmar-'+i+'" class="btn btn-success" id="confirmar-'+i+'" onClick="confirmar_reserva_llegada('+reserva.id_reserva+')" style="font-size:200%;margin-left:8%;width:15%">Ya llego!</button>'
                    +'<button type="submit" value="anular-'+i+'" class="btn btn-danger" id="anular-'+i+'" onclick="anular('+reserva.id_reserva+')" style="font-size:200%;margin-left:8%;width:15%">ANULAR</button>'
                    +'</div>'
                    +'</form>'
                    +'</div>'
                    +'</div>'
                +'</div>');
                }
            }
            
        }

    i=i+1;
    });
    if(i==0){
        $('#row-2').append('<div class="col-lg-12 col-md-12 col-xs-12 justify-center" id="reserva-'+0+'">'+
        '<div class="card border-primary">'
        +'<div class="card-header">'
        +'<h4 style="text-align:center;">Resultado de busqueda.</h4>'
        +'</div>'
        +'<div class="card-body">'
        +'<h1 style="text-align:center;"> No se encontraron reservas para con filtros aplicados</h1><hr>'
        +'</div>'
        +'</div>'
        +'</div>');
    }
};
function asignar(id_reserva){
    id_reservaa=id_reserva;
    $('#cont-asignacion').show();
    document.getElementById("cod_reserva").innerHTML+=id_reserva;    
}
function anular(i){
    var now = new Date();
            e.preventDefault();
            var day = ("0" + now.getDate()).slice(-2);
            var year = ( now.getFullYear());
            var hora = now.getHours();
            var minutos = now.getMinutes();
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var todayy = now.getFullYear()+"-"+(month)+"-"+(day) ;
    $.ajax({
        url:"/anular_reserva",
        type: "post",
        datetype: "json",
        assync: false,
        data:{ id_reserva:i , fecha_cancelacion : todayy},
        success: function(result){
         window.location = location.href;
        },
        error: function(){
            alert('error al anular');

        }
    }).responseText;
}
function confirmar_reserva_llegada(i){
    $.ajax({
        url:"/confirmar_reserva_llegada",
        type: "post",
        datetype: "json",
        assync: false,
        data:{ id_reserva:i},
        success: function(result){
         window.location = location.href;
        },
        error: function(){
            alert('error al confirmar');

        }
    }).responseText;
}
function crear_horarios(){
     var existeFecha=false;
    $.ajax({
        url:"/traer_estadisticas",
        type: "get",
        datetype: "json",
        assync: false,
        data:{fecha:$('#fecha').val()},
        success: function(result){
            $('#datos-estadisticas').empty();
            if(result[0].capacidad_restante == null){
                existeFecha=true;
            }
            result.forEach(element => {
                
                $('#datos-estadisticas').append('<div class="col-md-4" style="background-color:white;"><h3>Turno:  '+element.turno+'</h3>'
                                                +' </h3> capacidad restante: '+element.capacidad_restante+'</h3></div>');
            });
        },
        error: function(){
            

        }
    }).responseText;

    return existeFecha;
}
