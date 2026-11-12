const fs = require("fs");
const path = require("path");

// Ubicación del archivo JSON
const rutaJugadores = path.join(__dirname, "../data/jugadores.json");

// Obtener todos los jugadores
function obtenerJugadores() {
    const contenido = fs.readFileSync(rutaJugadores, "utf-8");

    return JSON.parse(contenido);
}

// Obtener un jugador por su ID
function obtenerJugadorPorId(id) {
    const jugadores = obtenerJugadores();

    return jugadores.find(jugador => jugador.id === id);
}

// Exportar las funciones
module.exports = {
    obtenerJugadores,
    obtenerJugadorPorId
};