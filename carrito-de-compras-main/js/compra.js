// ------------------------------------------------------------------------------------------------------
// ------------------ Trae datos desde Local Storage y los muestra en el html
// ------------------------------------------------------------------------------------------------------
const total = document.querySelector('#total');
let productosLS = localStorage.getItem('carrito');
let productosJson = JSON.parse(productosLS);

const listaJson = document.querySelector('#listado'); 
function agregarElementos(){ 
    
    productosJson.forEach (function (dataJson) {
    const subtotal = Number(dataJson.valor) * Number(dataJson.cantidad);
    var item = document.createElement('div');    
    item.innerHTML = `  
    <div class="nuevaLista"><img src="${dataJson.img}" alt="" width="150">
        <div id="nuevoItem">
            <p>${dataJson.producto} </p>
            <p>$${new Intl.NumberFormat('es-ar').format(dataJson.valor)} </p>
            <p>Cantidad: ${dataJson.cantidad}  </p>
            <p>Subtotal: $<span name="subtotalProducto">${Number(subtotal)}</span></p>
        </div> <hr>
        </div>`;
        listaJson.appendChild(item);
        })
    calcularTotal();
}

agregarElementos();

// ------------------------------------------------------------------------------------------------------
// ------------------ Vacia el carrito totalmente y lo borra del local storage
// ------------------------------------------------------------------------------------------------------
const vaciarCarrito = document.querySelector('#botonVaciar');
vaciarCarrito.addEventListener('click', function(){
    listaJson.innerHTML = '<h3 class="vacio">Carrito Vacío</h3><a href="index.html" class="vacioBack">Volver al shop</a>';
    localStorage.removeItem('carrito');
    total.innerHTML = 'Total: $0';
})

// ------------------------------------------------------------------------------------------------------
// ------------------ Suma todos los subtotales de cada producto, y muestra el total
// ------------------------------------------------------------------------------------------------------
function calcularTotal(){

    let subtotales = document.getElementsByName('subtotalProducto');
    let suma = 0;
    subtotales.forEach((subtotal) => {
        suma = suma + Number(subtotal.innerText);
        total.innerHTML = `Total: $${new Intl.NumberFormat('es-ar').format(Number(suma))}`;
    });
};

// ------------------------------------------------------------------------------------------------------
// ------------------ Confirma la compra siempre y cuando no se haya vaciado el carrito
// ------------------------------------------------------------------------------------------------------
const confirmar = document.querySelector('#botonConfirmar');
confirmar.addEventListener('click', function(){

    if(localStorage.getItem('carrito') === null){
        swal("No hay productos en tu carrito", "", "error");
    } else{
        swal("¡Compra confirmada gracias por preferirnos!", "", "success");
    }
})