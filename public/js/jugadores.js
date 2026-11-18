
const listaJugadores = document.querySelector("#lista-jugadores");
const filtroSeleccion = document.querySelector("#filtro-seleccion");
const mensaje = document.querySelector("#mensaje");

// Cargar las selecciones en el selector
equipos.forEach(function(equipo) {
    const opcion = document.createElement("option");

    opcion.value = equipo.nombre;
    opcion.textContent = equipo.bandera + " " + equipo.nombre;

    filtroSeleccion.appendChild(opcion);
});

// Mostrar los jugadores
function mostrarJugadores() {
    listaJugadores.innerHTML = "";
    mensaje.textContent = "";

    const seleccionElegida = filtroSeleccion.value;

    let jugadoresAMostrar = [];

    equipos.forEach(function(equipo) {
        if (seleccionElegida === "" ||
            equipo.nombre === seleccionElegida) {

            jugadoresAMostrar = jugadoresAMostrar.concat(
                equipo.jugadores
            );
        }
    });

    if (jugadoresAMostrar.length === 0) {
        mensaje.textContent =
            "Todavía no hay jugadores cargados para esta selección.";
        return;
    }

    jugadoresAMostrar.forEach(function(jugador) {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("jugador");

        const imagen = document.createElement("img");
        imagen.src = jugador.imagen;
        imagen.alt = jugador.nombre;

        

        const enlace = document.createElement("a");
        enlace.href = "detalle.html?jugador=" + jugador.id;
        enlace.textContent = "Ver detalle";
const nombre = document.createElement("h3");
nombre.textContent = jugador.nombre;
        tarjeta.appendChild(nombre);
        tarjeta.appendChild(imagen);
tarjeta.appendChild(enlace);

        listaJugadores.appendChild(tarjeta);
    });
}

// Actualizar cuando se elige una selección
filtroSeleccion.addEventListener("change", mostrarJugadores);

// Mostrar los jugadores iniciales
mostrarJugadores();
