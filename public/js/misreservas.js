$(function(){
   $('#card-recordar').hide();
   $('#card-exito').hide();
   $('#cont-mostrar').hide();
   $('#cont-mensajes').hide();
    $email=$('#email');
    $('#msj-cerrar').click(e=>{
        e.preventDefault();
        $('#cont-mensajes').hide();
    });
    $('#volver_menu').click(e=>{
        e.preventDefault();
        $('#card-recordar').hide();
        $('#card').show();
    });
    $('#ENTRAR').click(e=>{
        e.preventDefault();
        $.ajax({
            url:"/consultar_reserva",
            type:"post",
            dataType:"json",
            data:{email:$('#nickName').val(),codigo:$('#codigo').val()},
            success:(result)=>{
                result.forEach(element => {
                    if( element.id_reserva == $('#codigo').val()){
                        $('#card').hide();
                        document.getElementById('fecha').innerHTML=element.dia;
                        document.getElementById('id_reserva').innerHTML=element.id_reserva;
                        document.getElementById('comensales').innerHTML=element.comensales;
                        document.getElementById('salon').innerHTML=element.salon;
                        document.getElementById('turno').innerHTML=element.turno;
                        document.getElementById('email').innerHTML=element.email;
            
                    $('#cont-mostrar').show();
                    }else{
                        $('cont-mensajes').show();
                    }
                });
            },
            error:()=>{
                alert('Ops. hubo un error al realizar el proceso. Reintente.');
            }
        }).responseText;
    });

    const $recordar = document.querySelector('#recordar');
    $recordar.addEventListener('click',()=>{
        $('#card').hide();
        $('#card-recordar').show();
       
    });

    const $formRecordar= $('#recordarForm');
    $formRecordar.submit(e=>{
        e.preventDefault(); 
        $('#card-recordar').hide();
        $('#card-exito').show();
       $email=$('#email');
    });

    const $formExito= $('#exito-Form');
    $formExito.submit(e=>{
        e.preventDefault();
        document.getElementById('h3_1').innerHTML="Se ha enviado el codigo al mail"+$email;
        $.ajax({
            url:"/enviar_codigo",
            type:"post",
            dataType:"json",
            data:{email:('#nickName').val()},
            success:(result)=>{
                
            }
        });
        $('#card-exito').hide();
        $('#card').show();
        
    });
   
});