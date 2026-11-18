
const alineacionesService = require("../services/alineaciones.service");
const jugadoresService = require("../services/jugadores.service");
// Obtener todas las alineaciones guardadas
function obtenerAlineaciones(req, res) {
    const alineaciones = alineacionesService.obtenerAlineaciones();

    res.json(alineaciones);
}

function guardarAlineacion(req, res) {
    const { nombre, formacion, jugadores } = req.body;

    // Verificar que se hayan enviado todos los datos
    if (!nombre || !formacion || !jugadores) {
        return res.status(400).json({
            mensaje: "Faltan datos para guardar la alineación"
        });
    }

    // Verificar que la formación sea válida
    const formacionesValidas = ["4-3-3", "4-4-2", "3-5-2"];

    if (!formacionesValidas.includes(formacion)) {
        return res.status(400).json({
            mensaje: "La formación no es válida"
        });
    }

    // Verificar que haya exactamente 11 jugadores
    if (!Array.isArray(jugadores) || jugadores.length !== 11) {
        return res.status(400).json({
            mensaje: "La alineación debe tener 11 jugadores"
        });
    }

    // Verificar que no haya jugadores repetidos
    if (new Set(jugadores).size !== 11) {
        return res.status(400).json({
            mensaje: "No se pueden repetir jugadores"
        });
    }

    // Verificar que todos los jugadores existan
    const jugadoresExistentes = jugadoresService.obtenerJugadores();

    const idsValidos = jugadores.every(id =>
        jugadoresExistentes.some(jugador => jugador.id === id)
    );

    if (!idsValidos) {
        return res.status(400).json({
            mensaje: "Uno o más jugadores no existen"
        });
    }

    // Crear la alineación
    const nuevaAlineacion = {
        id: Date.now().toString(),
        nombre: nombre,
        formacion: formacion,
        jugadores: jugadores
    };

    alineacionesService.guardarAlineacion(nuevaAlineacion);

    res.status(201).json({
        mensaje: "Alineación guardada correctamente",
        alineacion: nuevaAlineacion
    });
}


function eliminarAlineacion(req, res) {
    const id = req.params.id;

    const eliminada = alineacionesService.eliminarAlineacion(id);

    if (!eliminada) {
        return res.status(404).json({
            mensaje: "No se encontró la alineación"
        });
    }

    res.json({
        mensaje: "Alineación eliminada correctamente"
    });
}

module.exports = {
    obtenerAlineaciones,
    guardarAlineacion,
    eliminarAlineacion
};
