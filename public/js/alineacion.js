

// Obtener los elementos del HTML
const cancha = document.querySelector("#cancha");
const formacion = document.querySelector("#formacion");
const botonLimpiar = document.querySelector("#limpiar-equipo");
const botonGuardar = document.querySelector("#guardar-alineacion");

const modalJugadores = document.querySelector("#modal-jugadores");
const listaJugadores = document.querySelector("#lista-jugadores");
const botonCerrarModal = document.querySelector("#cerrar-modal");
const buscadorPais = document.querySelector("#buscador-pais");
const listaAlineaciones = document.querySelector("#lista-alineaciones");

// Lista de jugadores obtenidos desde la API
let jugadores = [];

// Jugadores seleccionados en la cancha
let equipo = {};

// Espacio que estamos intentando completar
let espacioActual = null;
let posicionActual = null;

// Obtener los jugadores del servidor
async function cargarJugadores() {
    try {
        const respuesta = await fetch("/api/jugadores");

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los jugadores");
        }

        jugadores = await respuesta.json();

        console.log("Jugadores obtenidos:", jugadores);

        dibujarCancha();

    } catch (error) {
        console.error("Error al obtener los jugadores:", error);
    }
}

// Formaciones disponibles
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

// Dibujar la cancha según la formación elegida
function dibujarCancha() {

    const formacionElegida = formaciones[formacion.value];

    cancha.innerHTML = "";

    formacionElegida.forEach(function(grupo) {

        const fila = document.createElement("div");
        fila.classList.add("fila-jugadores");

        for (let i = 0; i < grupo.cantidad; i++) {

            const espacio = document.createElement("div");
            espacio.classList.add("espacio-jugador");

            // Identificador único de cada posición
            const clave = grupo.posicion + "-" + i;

            espacio.dataset.clave = clave;

            espacio.innerHTML = `
                <button class="circulo-jugador" type="button">
                    +
                </button>

                <p>${grupo.posicion}</p>
                <p class="nombre-jugador"></p>
            `;

            // Mostrar el jugador si ya estaba seleccionado
            const jugadorId = equipo[clave];

            if (jugadorId) {
                const jugador = jugadores.find(
                    j => j.id === jugadorId
                );

                if (jugador) {
                    espacio.querySelector(".circulo-jugador").textContent =
                        jugador.dorsal;

                    espacio.querySelector(".nombre-jugador").textContent =
                        jugador.nombre;
                }
            }

            // Abrir la ventana de selección
            const boton = espacio.querySelector(".circulo-jugador");

           boton.addEventListener("click", function() {

    if (equipo[clave]) {
        quitarJugador(espacio);
    } else {
        seleccionarJugador(grupo.posicion, espacio);
    }

});

            fila.appendChild(espacio);
        }

        cancha.appendChild(fila);
    });
}

// Abrir la ventana para seleccionar un jugador
function seleccionarJugador(posicion, espacio) {

    posicionActual = posicion;
    espacioActual = espacio;
   

    // Buscar los jugadores de esa posición
    const jugadoresDisponibles = jugadores.filter(function(jugador) {

    const yaSeleccionado = Object.values(equipo).includes(jugador.id);

    const coincidePosicion = jugador.posicion === posicion;

    const coincidePais = jugador.seleccion
        .toLowerCase()
        .includes(buscadorPais.value.toLowerCase().trim());

    return coincidePosicion && !yaSeleccionado && coincidePais;
});
    // Limpiar la ventana
    listaJugadores.innerHTML = "";

    if (jugadoresDisponibles.length === 0) {
        listaJugadores.textContent = "No hay jugadores disponibles para esta posición.";
    }

    // Crear una tarjeta por cada jugador
    jugadoresDisponibles.forEach(function(jugador) {

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-jugador");

        tarjeta.innerHTML = `
            <img src="${jugador.imagen}" alt="${jugador.nombre}">
            <h4>${jugador.nombre}</h4>
            <p>${jugador.dorsal}</p>
        `;

        tarjeta.addEventListener("click", function() {
            colocarJugador(jugador);
        });

        listaJugadores.appendChild(tarjeta);
    });

    // Mostrar la ventana
    modalJugadores.classList.add("modal-visible");
}


// Colocar el jugador elegido en la cancha
function colocarJugador(jugador) {

    // Si el espacio ya tenía un jugador, liberarlo
    const clave = espacioActual.dataset.clave;

    delete equipo[clave];

    // Guardar el nuevo jugador
    equipo[clave] = jugador.id;

    // Actualizar la cancha
    espacioActual.querySelector(".circulo-jugador").textContent =
        jugador.dorsal;

    espacioActual.querySelector(".nombre-jugador").textContent =
        jugador.nombre;

    // Cerrar la ventana
    modalJugadores.classList.remove("modal-visible");
}

// Cerrar la ventana de selección
function cerrarModal() {
    modalJugadores.classList.remove("modal-visible");

    espacioActual = null;
    posicionActual = null;
}

// Cerrar al tocar la X
botonCerrarModal.addEventListener("click", cerrarModal);

// Cerrar al tocar fuera de la ventana
modalJugadores.addEventListener("click", function(evento) {
    if (evento.target === modalJugadores) {
        cerrarModal();
    }
});

// Quitar un jugador de la cancha
function quitarJugador(espacio) {

    const clave = espacio.dataset.clave;

    delete equipo[clave];

    espacio.querySelector(".circulo-jugador").textContent = "+";
    espacio.querySelector(".nombre-jugador").textContent = "";
}

// Guardar la alineación actual
async function guardarAlineacion() {

    const espacios = Array.from(
        cancha.querySelectorAll(".espacio-jugador")
    );

    // Obtener los jugadores respetando el orden de la cancha
    const jugadoresSeleccionados = espacios
        .map(espacio => equipo[espacio.dataset.clave])
        .filter(Boolean);

    if (jugadoresSeleccionados.length !== 11) {
        alert("Tenés que completar los 11 jugadores antes de guardar.");
        return;
    }

    const nombre = prompt("¿Qué nombre querés darle a tu alineación?");

    if (nombre === null || nombre.trim() === "") {
        return;
    }

    const nuevaAlineacion = {
        nombre: nombre.trim(),
        formacion: formacion.value,
        jugadores: jugadoresSeleccionados
    };

    try {
        const respuesta = await fetch("/api/alineaciones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaAlineacion)
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.mensaje || "No se pudo guardar");
        }

        alert("¡Alineación guardada correctamente!");

        cargarAlineaciones();

    } catch (error) {
        console.error("Error al guardar:", error);
        alert(error.message);
    }
}


// Consultar las alineaciones guardadas
async function cargarAlineaciones() {

    try {
        const respuesta = await fetch("/api/alineaciones");
        const alineaciones = await respuesta.json();

        listaAlineaciones.innerHTML = "";

        if (alineaciones.length === 0) {
            listaAlineaciones.textContent = "Todavía no guardaste ninguna alineación.";
            return;
        }

        alineaciones.forEach(function(alineacion) {

            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta-alineacion");

            const titulo = document.createElement("h4");
            titulo.textContent = alineacion.nombre;

            const detalle = document.createElement("p");
            detalle.textContent = "Formación: " + alineacion.formacion;

            const botonCargar = document.createElement("button");
            botonCargar.textContent = "Cargar";
            botonCargar.addEventListener("click", function() {
                cargarAlineacion(alineacion);
            });

            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.addEventListener("click", function() {
                eliminarAlineacion(alineacion.id);
            });

            tarjeta.appendChild(titulo);
            tarjeta.appendChild(detalle);
            tarjeta.appendChild(botonCargar);
            tarjeta.appendChild(botonEliminar);

            listaAlineaciones.appendChild(tarjeta);
        });

    } catch (error) {
        console.error("Error al cargar alineaciones:", error);
    }
}


// Recuperar una alineación guardada
function cargarAlineacion(alineacion) {

    formacion.value = alineacion.formacion;

    // Dibujar los espacios de la formación elegida
    equipo = {};
    dibujarCancha();

    const espacios = Array.from(
        cancha.querySelectorAll(".espacio-jugador")
    );

    alineacion.jugadores.forEach(function(idJugador, indice) {

        const espacio = espacios[indice];

        if (espacio) {
            equipo[espacio.dataset.clave] = idJugador;
        }

    });

    dibujarCancha();
}


// Eliminar una alineación guardada
async function eliminarAlineacion(id) {

    if (!confirm("¿Seguro que querés eliminar esta alineación?")) {
        return;
    }

    try {
        const respuesta = await fetch("/api/alineaciones/" + id, {
            method: "DELETE"
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.mensaje || "No se pudo eliminar");
        }

        alert("Alineación eliminada correctamente.");

        cargarAlineaciones();

    } catch (error) {
        console.error("Error al eliminar:", error);
        alert(error.message);
    }
}
// Eventos de los botones
botonGuardar.addEventListener("click", guardarAlineacion);

botonLimpiar.addEventListener("click", function() {
    equipo = {};
    dibujarCancha();
});

// Cambiar formación y comenzar un equipo nuevo
formacion.addEventListener("change", function() {
    equipo = {};
    dibujarCancha();
});
// Actualizar jugadores mientras escribimos en el buscador
buscadorPais.addEventListener("input", function() {

    if (espacioActual) {
        seleccionarJugador(posicionActual, espacioActual);
    }

});
// Iniciar la página
cargarJugadores();
cargarAlineaciones();