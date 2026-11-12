
const contenedor = document.querySelector("#detalle-jugador");

const parametros = new URLSearchParams(window.location.search);
const idJugador = parametros.get("jugador");

let jugadorEncontrado = null;

equipos.forEach(function(equipo) {
    equipo.jugadores.forEach(function(jugador) {
        if (jugador.id === idJugador) {
            jugadorEncontrado = jugador;
        }
    });
});

if (jugadorEncontrado) {

    contenedor.innerHTML = `
        <div class="detalle-imagen">
            <img src="${jugadorEncontrado.imagen}" 
                 alt="${jugadorEncontrado.nombre}">
        </div>

        <div class="detalle-info">
            <h2>${jugadorEncontrado.nombre}</h2>

            <p><strong>Selección:</strong> ${jugadorEncontrado.seleccion}</p>

            <p><strong>Posición:</strong> ${jugadorEncontrado.posicion}</p>

            <p><strong>Dorsal:</strong> ${jugadorEncontrado.dorsal}</p>

            <a href="jugadores.html">Volver a jugadores</a>
        </div>
    `;

} else {
    contenedor.textContent = "No se encontró el jugador.";
}
