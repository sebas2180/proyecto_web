$(function(){
 
  const $form_ingreso = $('#form-ingreso');
  $form_ingreso.submit(e=>{
    e.preventDefault();
    $.ajax({
      url:'/login',
      type: 'get',
      typeData: 'json',
      async: false,
      data: {usuario:$('#usuario').val(),password:$('#password').val()},
      success: (result)=>
        alert('ok')
    }).responseText
  });
    $('.nav-link').click(()=>{
      $('.navbar-collapse').collapse('hide');
    });
    iniciarMap();
})
function iniciarMap(){
    var coord = {lat:-34.607847 ,lng: -58.386445};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    })
}