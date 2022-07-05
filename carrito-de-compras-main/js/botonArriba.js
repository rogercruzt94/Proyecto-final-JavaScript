// ------------------------------------------------------------------------------------------------------
// ------------------ Boton arriba, se muestra y se oculta al hacer scroll
// ------------------------------------------------------------------------------------------------------
$(function(){
    $('.ir-arriba').click(function(){
        $('body, html').animate({
            scrollTop: "0px"
        }, 300);
    });

    $(window).scroll(function(){
        if($(this).scrollTop() > 0){
            $('.ir-arriba').slideDown(300);
        } else{
            $('.ir-arriba').slideUp(300)
        }
    });
});