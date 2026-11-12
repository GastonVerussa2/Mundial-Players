const jugadoresService = require("../services/jugadores.service");

// Obtener todos los jugadores
function obtenerJugadores(req, res) {
    const jugadores = jugadoresService.obtenerJugadores();

    res.json(jugadores);
}
// Obtener un jugador por su ID
function obtenerJugadorPorId(req, res) {
    const id = req.params.id;

    const jugador = jugadoresService.obtenerJugadorPorId(id);

    if (!jugador) {
        return res.status(404).json({
            mensaje: "No se encontró el jugador solicitado"
        });
    }

    res.json(jugador);
}
module.exports = {
    obtenerJugadores,
    obtenerJugadorPorId
};