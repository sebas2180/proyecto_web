$(function(){
    $('#personas').prop('disabled',true);
    $('#hora').prop('disabled',true);
    $('#cont-reserva').hide();
    $('#cont-reserva').toggle('swing');
    $('.nav-link').click(()=>{
        $('.navbar-collapse').collapse('hide');
      });
    
    const resert = document.querySelector('#resert');
        resert.addEventListener('click',()=>{
            $('#nombre').val(null);
            $('#apellido').val(null);
            $('#email').val(null);
            $('#hora').empty();
            $('#personas').val(0);
            $('#nro').empty();
            $('#salon').val('default');
            document.getElementById("hora").innerHTML="<option value=\"a\">Seleccione una hora</option>";
            $('#salon').val('default');
            $('#fecha').prop('disabled',false);
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var year = ( now.getFullYear());
            var hora = now.getHours();
            var minutos = now.getMinutes();
            
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
            $("#fecha").val(today);
        });
    
        $('#exito').hide();

    
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var year = ( now.getFullYear());
    var hora = now.getHours();
    var minutos = now.getMinutes();
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    $("#fecha").val(today);
    var minimo= year+"-"+month+"-"+day;
    var maximo=  new Date();
    maximo.setMonth(now.getMonth()+4);
    $('#fecha').change(()=>{
        $personas=0;
         $('#personas').val(0);
         document.getElementById('nro').innerHTML=" "+$personas+"  Personas";
         $('#salon').val('default');
         $('#turno').val('default');
      
    });
    $('#salon').change(()=>{
        $personas=0;
               $('#personas').val(0);
                document.getElementById('nro').innerHTML=" "+$personas+"  Personas";
                $('#turno').val('default');
        if( $('#salon').val()=='afuera'){
            alert('Este salon es sin reserva. Presentarse directamente.');
        }
    });


    $('#personas').click(()=>{
        $('#hora').val('a');
        $('#hora').prop('disabled',false);
        if($('#hora').val() == 'a'){
            traerHoras();
        }
    });
    $('#turno').click(()=>{
        $('#personas').prop('disabled',false);
        $('#personas').val(0);
        $('#hora').val('a');
        $('#personas')
   

        var fechaActual = new Date();
    var day = ("0" + fechaActual.getDate()).slice(-2);
        var year = ( fechaActual.getFullYear());
        var month = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
        var fechaActual = fechaActual.getFullYear()+"-"+(month)+"-"+(day) ;
      
    if(fechaActual<=$('#fecha').val()){
        $.ajax({
            url: "/comprobar_comensales",
            type: "get",
            dataType: "json",
            async: false,
            data:{fecha:$('#fecha').val(),turno:$('#turno').val()},
            success:(result)=>{
               result.forEach(e=>{
                $('#personas').attr({  
                    max:e.max_comensales
                });
               });
               $personas=0;
               $('#personas').val(0);
                document.getElementById('nro').innerHTML=" "+$personas+"  Personas";
                 console.log($personas);
                
            }
        }).responseText;
               

    }else{
        alert('La fecha debe ser igual o mayor a la actual !');
    }
        
    });
    
  
    $('#fecha').attr({
       min: minimo
    });
    $('#fecha').attr({
        max: maximo
     });
    document.getElementById('nro').innerHTML=" 0 ";
    $('#personas').change(()=>{
        $personas=0;
        $personas= $('#personas').val();
        document.getElementById('nro').innerHTML=" "+$personas+"  Personas";
        console.log($personas);
       
    });
   
    $formulario = $('#form');

    $formulario.submit(e=>{
        e.preventDefault(); 
        var horaOk=false;
        $hora= $('#hora').val();
        console.log($hora);
        if($hora=="a"){
            document.getElementById('mensajeHora').innerHTML="Falta seleccionar horario";
        }else{
            document.getElementById('mensajeHora').innerHTML="";
        }
        
        $cant = $('#personas').val();
        if($cant ==0){
          
            document.getElementById('mensajePersona').innerHTML="Falta seleccionar cantidad de personas";
        }else{
            document.getElementById('mensajePersona').innerHTML="";
        }
        
        $salon = $('#salon').val();
        if($salon =='default'){
          
            document.getElementById('mensajeSalon').innerHTML="Falta seleccionar el salon";
        }else{
            document.getElementById('mensajeSalon').innerHTML="";
        }

        $turno = $('#turno').val();
        if($turno =='default'){
          
            document.getElementById('mensajeTurno').innerHTML="Falta seleccionar el turno";
        }else{
            document.getElementById('mensajeTurno').innerHTML="";
            var formData = new FormData(document.getElementById("form"));
        if($('#hora').val()!='a' && $('#personas').val()!=0 && $('#salon').val()!='default'){
            $.ajax({
                url: "/reservas",
                type: "post",
                dataType: "json",
                async: false,
                data: {nombre: $('#nombre').val(),personas: $('#personas').val(),apellido:$('#apellido').val(),email:$('#email').val(),
                        telefono: $('#telefono').val(),fecha: $('#fecha').val(),hora:$('#hora').val(),
                        turno:$('#turno').val(),salon:$('#salon').val()}     ,
                success: function(result){
                    console.log(result.status);
                    if(result.status == 400){
                        alert('resultado: '+result.success);
                    }else{
                      if(result.status == 600){
                        alert(result.success);
                       
                      }else{
                        $('#cont-reserva').hide();
                        $('#exito').show();
                        
                     $('#exito-body').append('<h2>Codigo de reserva:'+result.id_reserva+' </h2><hr>'+
                      +'<h2>Recibirá un correo electronico confirmando la reserva.</h2>'
                      +'<span>Correo electronico:        '+$('#email').val()+'</span><br>'
                       +'<span>Cantidad de comensales:        '+$('#personas').val()+'</span><br>'
                     +'<span>Fecha:     '+$('#fecha').val()+'</span><br>'
                     +'<span>Salon:     '+$('#salon').val()+'</span><br>'
                      +'<span>Horario:     '+$('#hora').val()+'</span><br>'
                      +'<span>TOLERANCIA DE 15 MINUTOS. DE NO PRESENTARSE SE ANULA LA RESERVA<span>'
                        );          
                      }
                    }
                } ,
                error: ()=>{
                    console.log('error');
                }
            })
            .responseText;
        }
        }

        

        
    });
    function insertarHora(){
        $.ajax({
            url: "/horarios",
            type: "get",
            dataType: "json",
            async: false,
            data:{fecha:$('#fecha').val(),turno:$('#turno').val(),salon:$('#salon').val()},
            success: (result)=>{
                $('#hora').empty();
                document.getElementById("hora").innerHTML="<option value=\"a\">Seleccione una hora</option>";
               result.forEach(element => {
                   console.log(element.hora);
                   document.getElementById('hora').innerHTML+="<option value="+element.hora+">"+element.hora+"</option>";
                   console.log('inserto');
               });
            },error: function(){
                console.log('error');
            }
        }).responseText;
    }
    
   function traerHoras(){
    var fechaActual = new Date();
    var day = ("0" + fechaActual.getDate()).slice(-2);
        var year = ( fechaActual.getFullYear());
        var month = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
        var fechaActual = fechaActual.getFullYear()+"-"+(month)+"-"+(day) ;
      
    if(fechaActual<=$('#fecha').val()){

    if($('#salon').val() != 'default'){
        $.ajax({
            url: "/insertar_horarios",
            type: "get",
            dataType: "json",
            async: false,
            data:{fecha:$('#fecha').val(),turno:$('#turno').val()},
            success: ()=>{
                console.log('okk');
            }
     } )    .responseText;
    insertarHora();
    }
    }else{
        alert('La fecha debe ser igual o mayor a la actual !');
    }
 
$('#hora').change(()=>{
    $("#fecha").prop('disabled',true);
});
   }
})