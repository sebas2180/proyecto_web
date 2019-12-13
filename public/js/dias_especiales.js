$(()=>{
  
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
    var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var year = ( now.getFullYear());
            var hora = now.getHours();
            var minutos = now.getMinutes();
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
            $("#fecha").val(today);
    obtener_dias();
//
$('#btn-reservas').click(()=>{
    window.location.href='http://localhost:2000/lista_reservas';
});
    $('#guardar').click(()=>{
       
        if($('#turno').val()=='seleccionar'){
            alert('falta seleccionar turno');
        }else{
          is_feriado();
        }
    });
    $('#btn-salir').click(e=>{
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
    $('#turno').click(()=>{
        if( $('#turno').val() == 'almuerzo'){
            $('#hora').empty();
            document.getElementById("hora").innerHTML+="<option value=\"Seleccione una hora\">Seleccione una hora</option>";
            document.getElementById("hora").innerHTML+="<option value=\"12:00\">12:00</option>";
            document.getElementById("hora").innerHTML+="<option value=\"12:15\">12:15</option>";
            document.getElementById("hora").innerHTML+="<option value=\"12:30\">12:30</option>";
        }else{
            if( $('#turno').val() == 'cena'){
                $('#hora').empty();
                document.getElementById("hora").innerHTML+="<option value=\"Seleccione una hora\">Seleccione una hora</option>";
                document.getElementById("hora").innerHTML+="<option value=\"21:00\">21:00</option>";
                document.getElementById("hora").innerHTML+="<option value=\"21:15\">21:15</option>";
            }
        }
    });
});
function obtener_dias(){
   
    $.ajax({
        url:  "/traer_dias_especiales"  ,
        type:   "get",
        dataType:   "json",   
        assync: false,
        data:{}  ,
        success:(result)=>
        result.forEach(e => {
            var dia = e.dia;
           
            $('#tr_bd').append('<tr><th scoope="row">'+e.id_feriado+'</th><td>'+dia.substring(0,10)+'</td>'
                                                                    +'<td>'+e.turno+'</td>'
                                                                    +'<td>'+e.max_comensales+'</td>'
                                                                    +'<td>'+e.codigo_hora+'</td>'
                                                                    +'</td></tr>');
        })
           
        
    }).responseText;
};
function is_feriado(){
    var confirmacion=false;is_feriado=false;
    $.ajax({
        url:"/existen_reservas_dia",
        datatype:"json",
        type:"post",
        assync:false,
        data:{fecha:$('#fecha').val(),comensales:$('#comensales').val(),
                        turno:$('#turno').val(),hora:$('#hora').val()},
        success:(result)=>{
            if(result.status==520){
                is_feriado=true;
                confirmacion= confirm(result.msj);
            }
            if(confirmacion && is_feriado== true){
                var resultado = avisar_cambio();
                console.log(resultado);
                    alert(resultado);
                    set_dia();
                
            }
                if(is_feriado ==false){
                    set_dia();
            
                }
            alert('cambios realizados con exito!');
        },error:()=>{
            alert('Error al consultar si es feriado');
        }
    }).responseText;
    
}
function set_dia(){
    $.ajax({
        url:"/set_dia_especial",
        type: "post",
        dataType:"json",
        assync:false,
        data:{fecha:$('#fecha').val(),comensales:$('#comensales').val(),
                turno:$('#turno').val(),hora:$('#hora').val()},
        success:(result)=>{
            alert(result);
            
        },
        error(err){
            alert('ha sucedido un error, reintente mas tarde');
        }
        
    }).responseText;
}
function avisar_cambio(){
    var resultado;
    $.ajax({
        url:"/mandar_notificacion",
        type:"post",
        datatype:"json",
        assync:false,
        data:{turno:$('#turno').val(),fecha:$('#fecha').val(),hora:$('#hora').val()},
        success:(result)=>{
            resultado=result;
            console.log('result:    '+result);
            alert(result);
        },
        error:()=>{
            console.log('hubo un errror');
           resultado = null;
        }
    }).responseText;
    return resultado;
}