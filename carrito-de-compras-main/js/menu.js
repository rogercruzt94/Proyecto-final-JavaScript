// ------------------------------------------------------------------------------------------------------
// ------------------ Filtra el tipo de vehiculo desde los botones del menu
// ------------------------------------------------------------------------------------------------------
let botonesMenu = document.querySelectorAll(".botonMenu").forEach(boton => {
    boton.addEventListener('click', function() {
        id = boton.id;
        filtrarInstrumento();
    })
  });

function filtrarInstrumento(){
    contenedorInstrumentos.innerHTML = '';
    instrumentos.filter(elem => elem.tipo == id).forEach((producto) => {
        crearCard(producto);
    });
    agrandarImagen();
};

// ------------------------------------------------------------------------------------------------------
// ------------------ Avisa en el icono de carrito que se agrego un producto
// ------------------------------------------------------------------------------------------------------
function avisarProductoCarrito(){
    avisoCarrito.style.transform = 'scale(2)';
    setTimeout(function(){ 
        avisoCarrito.style.transform = 'scale(1)';
    }, 500);
}