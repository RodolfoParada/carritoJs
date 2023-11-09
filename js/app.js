//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();

function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Al Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    })

}

//funciones
function agregarCurso(e) {
    e.preventDefault();


    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }
}



// lee el contenido del HTML al que le dimos click y extrae la información del curso 

function leerDatosCursos(curso) {
    // console.log(curso)
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id == infoCurso.id) {

                curso.cantidad++;
                return curso;

            } else {
                return curso;
            }
        });
        actualizarCarrito(...cursos);

    } else {
        // agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }



    console.log("ARTICULOS", articulosCarrito);

    carritoHTML();
}

function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Encuentra el curso en el carrito
        const cursoEncontrado = articulosCarrito.find(curso => curso.id === cursoId);
        if (cursoEncontrado.cantidad > 1) {
            // Si la cantidad es mayor que 1, disminuye la cantidad
            carritoHTML();
            cursoEncontrado.cantidad--;
        } else {
            // Si la cantidad es 1, elimina el curso del carrito
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        }
        carritoHTML();

    }


}











// muestra el carrito de compras en el HTML
function carritoHTML() {

    limpiarHTML();

    articulosCarrito.forEach((curso) => {
        const {
            imagen,
            titulo,
            precio,
            cantidad
        } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
           <td>
              <img src="${imagen}" width="100">
           </td>
           <td>
             ${titulo}
           </td>
           <td>
              ${precio}
           </td>
           <td>
              ${cantidad}
           </td>
           <td>
              <a href="#" class="borrar-curso" data-id="${curso.id}">x </a>
           </td>
           <td>
             
           </td>
        `;
        // agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row)
    });
}
// ELimima los cursos del tbody
function limpiarHTML() {
    // contenedorCarrito.innerHTML = "";


    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}