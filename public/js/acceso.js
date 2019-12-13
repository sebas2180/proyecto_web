$(()=>{
$formulario = $('#form-ingreso');
$formulario.submit(e=>{
    e.preventDefault();
        $.ajax({
            url: '/login',
            type: 'post',
            dataType: 'json',
            async: false,
            data:{email:$('#email').val(),password:$('#password').val()},
            success: function(result){
                if(result.status == 703){
                    $('#modal1').hide();
			        window.location.href='http://localhost:2000/lista_reservas';
                }
                if(result.status == 702){
              
                }
            },error:(err)=>{
                console.log(err);
            }
        }
        ).responseText;
        
});
});