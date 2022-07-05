// ------------------------------------------------------------------------------------------------------
// ------------------ Agranda imagenes sobre una capa transparente, asignandoles clases definidas en CSS
// ------------------------------------------------------------------------------------------------------
const imagenesCapa = document.querySelector('.agregar-imagen');
const contenedorCapa = document.querySelector('.imagenCapa');

contenedorCapa.addEventListener('click', (e) => {
    if(e.target != imagenesCapa){
        contenedorCapa.classList.toggle('mostrar');
        imagenesCapa.classList.toggle('mostarImg');
    };
});

function agrandarImagen(){
    const imagenes = document.querySelectorAll('.img-galeria');
    imagenes.forEach(imagen =>{
        imagen.addEventListener('click', () =>{
            aparecerImagen(imagen.getAttribute('src'));
        });
    });
};

function aparecerImagen(imagen){
    imagenesCapa.src = imagen;
    contenedorCapa.classList.toggle('mostrar');
    imagenesCapa.classList.toggle('mostarImg');
};