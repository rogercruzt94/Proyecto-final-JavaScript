// ------------------------------------------------------------------------------------------------------
// ------------------ Local Storage
// ------------------------------------------------------------------------------------------------------
let carrito;
if (localStorage.carrito) {carrito = JSON.parse(localStorage.carrito);}
else {carrito = [];}

// ------------------------------------------------------------------------------------------------------
// ------------------ Variables globales
// ------------------------------------------------------------------------------------------------------
const iconoCarrito = document.querySelector('.iconoCarrito');
const avisoCarrito = document.querySelector('.avisoCarrito');
const contenedorInstrumentos = document.querySelector('#contenedorInstrumentos');
const contenedorCarrito = document.querySelector('#contenedor_carrito');
const contenedorTotal = document.querySelector('#contenedor_total');

// ------------------------------------------------------------------------------------------------------
// ------------------ La base de datos se guarda en array instrumentos y ejecuta las funciones necesarias
// ------------------------------------------------------------------------------------------------------
let instrumentos = [];
$.ajax({
    url: 'productos.json',
    success: function (data) {
        data.forEach((instrumento) => {
            instrumentos.push(instrumento)
        });

    mostrarTodo();
    agrandarImagen();
    },
    error: function () {
        console.log("Error");
    }
});

// ------------------------------------------------------------------------------------------------------
// ------------------ Muestra la totalidad de productos
// ------------------------------------------------------------------------------------------------------
function mostrarTodo() {
    instrumentos.forEach((producto) => {
        crearCard(producto);
    });
};

// ------------------------------------------------------------------------------------------------------
// ------------------ Crea la card de cada producto
// ------------------------------------------------------------------------------------------------------
function crearCard(producto){
    const instrumentoDiv = document.createElement('div');
        instrumentoDiv.setAttribute('class', 'instrumento');
        instrumentoDiv.innerHTML = `<img src=${producto.img} class="img-galeria">
        <h2>${producto.producto}</h2>
        <h2>$${new Intl.NumberFormat('es-ar').format(producto.valor)}</h2>
        <button onclick='agregarInstrumento(${instrumentos.indexOf(producto)})'>Agregar al carrito</button>`;
    
        contenedorInstrumentos.appendChild(instrumentoDiv);
};

// ------------------------------------------------------------------------------------------------------
// ------------------ Chequea cantidad de un producto
// ------------------------------------------------------------------------------------------------------
function cambiarCantidad(e) {
    if (e.target.value == 0) {carrito.splice(e.target.name, 1);}
    else {carrito[e.target.name].cantidad = e.target.value;}
    cargarCarrito();
    localStorage.carrito = JSON.stringify(carrito);
};

// ------------------------------------------------------------------------------------------------------
// ------------------ Agrega producto al carrito
// ------------------------------------------------------------------------------------------------------
function agregarInstrumento(index) {
    var producto = instrumentos[index];
    if (carrito.length > 0) {
        let noExiste = true;
        for (var i = 0; i < carrito.length; i++) {
            if (producto.producto === carrito[i].producto) {
                carrito[i].cantidad++;
                noExiste = false;
            }
        }
        if (noExiste) {
        producto.cantidad = 1;
        carrito.push(producto);
        }
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    cargarCarrito();
    avisarProductoCarrito()
    localStorage.carrito = JSON.stringify(carrito);
};

// ------------------------------------------------------------------------------------------------------
// ------------------ Carga productos agregados al carrito y habilita entrar al carrito desde el menu 
// ------------------------------------------------------------------------------------------------------
function cargarCarrito() {
    contenedorCarrito.innerHTML = '';
    contenedorTotal.innerHTML = '';

    if (carrito.length > 0) {
        avisoCarrito.style.display = "block";
        iconoCarrito.setAttribute( "href", "compra.html" );
        let contador = 0;
        carrito.forEach((producto) => {
            let productosEnCarrito = document.createElement('div');
            productosEnCarrito.setAttribute('class', 'item');
            productosEnCarrito.innerHTML = `
                <p>Producto: ${producto.producto} <br> 
                Cantidad: ${producto.cantidad} <br> 
                Subtotal: $${new Intl.NumberFormat('es-ar').format(producto.valor * producto.cantidad)}</p>
                <div class='botonesItem'>    
                <button onclick='quitarItem(${carrito.indexOf(producto)})'> - </button>
                <input name='${carrito.indexOf(producto)}' value='${producto.cantidad}' disabled onchange='cambiarCantidad(event)'> 
                <button onclick='agregarItem(${carrito.indexOf(producto)})'> + </button>
                <div>`;
            contenedorCarrito.appendChild(productosEnCarrito);
            contador = contador + producto.valor * producto.cantidad;
        });

        let totalCarrito = document.createElement('h2');
        totalCarrito.innerHTML = `Total: $${new Intl.NumberFormat('es-ar').format(contador)}`;
        contenedorTotal.innerHTML = `<a href="compra.html" class="botonComprar">Comprar</a>`
        
        contenedorTotal.appendChild(totalCarrito);
    } else{
        avisoCarrito.style.display = "none";
        iconoCarrito.setAttribute( "href", "#" );
    }
};

// ------------------------------------------------------------------------------------------------------
// ------------------ Resta o suma el mismo producto
// ------------------------------------------------------------------------------------------------------
function quitarItem(index) {
    carrito[index].cantidad = carrito[index].cantidad - 1;
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
        avisoCarrito.style.display = "none";
    }
    localStorage.carrito = JSON.stringify(carrito);
    cargarCarrito();
};

function agregarItem(index) {
    carrito[index].cantidad = carrito[index].cantidad + 1;
    localStorage.carrito = JSON.stringify(carrito);
    cargarCarrito();
    avisarProductoCarrito()
};

cargarCarrito();