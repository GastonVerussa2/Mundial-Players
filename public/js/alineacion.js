
// Obtener los elementos del HTML
const cancha = document.querySelector("#cancha");
const formacion = document.querySelector("#formacion");
const botonLimpiar = document.querySelector("#limpiar-equipo");

// Lista donde guardaremos los jugadores de la API
let jugadores = [];

// Consultar los jugadores al servidor
fetch("/api/jugadores")
    .then(function(respuesta) {
        return respuesta.json();
    })
    .then(function(datos) {
        jugadores = datos;

        console.log("Jugadores obtenidos:", jugadores);
    })
    .catch(function(error) {
        console.error("Error al obtener los jugadores:", error);
    });

// Definir las posiciones de cada formación
const formaciones = {
    "4-3-3": [
        { posicion: "Arquero", cantidad: 1 },
        { posicion: "Defensor", cantidad: 4 },
        { posicion: "Mediocampista", cantidad: 3 },
        { posicion: "Delantero", cantidad: 3 }
    ],

    "4-4-2": [
        { posicion: "Arquero", cantidad: 1 },
        { posicion: "Defensor", cantidad: 4 },
        { posicion: "Mediocampista", cantidad: 4 },
        { posicion: "Delantero", cantidad: 2 }
    ],

    "3-5-2": [
        { posicion: "Arquero", cantidad: 1 },
        { posicion: "Defensor", cantidad: 3 },
        { posicion: "Mediocampista", cantidad: 5 },
        { posicion: "Delantero", cantidad: 2 }
    ]
};


 // Crear los espacios para los jugadores


function dibujarCancha() {

    const formacionElegida = formaciones[formacion.value];

    cancha.innerHTML = "";

    formacionElegida.forEach(function(grupo) {

        const fila = document.createElement("div");
        fila.classList.add("fila-jugadores");

        for (let i = 0; i < grupo.cantidad; i++) {

            const espacio = document.createElement("div");
            espacio.classList.add("espacio-jugador");

            espacio.innerHTML = `
                <button class="circulo-jugador" type="button">
                    +
                </button>

                <p>${grupo.posicion}</p>
                <p class="nombre-jugador"></p>
            `;

            // Al hacer clic, abrir la selección de jugadores
            const boton = espacio.querySelector(".circulo-jugador");

            boton.addEventListener("click", function() {
                seleccionarJugador(grupo.posicion, espacio);
            });

            fila.appendChild(espacio);
        }

        cancha.appendChild(fila);
    });
}



// Dibujar la cancha al ingresar
dibujarCancha();

function seleccionarJugador(posicion, espacio) {


    console.log("Posición seleccionada:", posicion);
console.log("Jugadores disponibles:", jugadores);
    // Buscar jugadores que coincidan con la posición
    const jugadoresDisponibles = jugadores.filter(function(jugador) {
        return jugador.posicion === posicion;
    });

    // Crear una lista con los nombres
    let opciones = "Elegí un jugador:\n\n";

    jugadoresDisponibles.forEach(function(jugador, indice) {
        opciones += (indice + 1) + " - " + jugador.nombre +
                    " (" + jugador.seleccion + ")\n";
    });

    // Mostrar la lista
    const eleccion = prompt(opciones);

    // Comprobar que se eligió una opción válida
    const indice = Number(eleccion) - 1;

    if (eleccion === null || eleccion.trim() === "") {
        return;
    }

    if (indice < 0 || indice >= jugadoresDisponibles.length ||
        !Number.isInteger(Number(eleccion))) {
        alert("La opción no es válida");
        return;
    }

    const jugadorElegido = jugadoresDisponibles[indice];

    // Mostrar el jugador en la cancha
    espacio.querySelector(".circulo-jugador").textContent =
        jugadorElegido.dorsal;

    espacio.querySelector(".nombre-jugador").textContent =
        jugadorElegido.nombre;
}

// Cambiar la cancha cuando se selecciona otra formación
formacion.addEventListener("change", function() {
    dibujarCancha();
});

// Limpiar todos los jugadores seleccionados
botonLimpiar.addEventListener("click", function() {
    dibujarCancha();
});
