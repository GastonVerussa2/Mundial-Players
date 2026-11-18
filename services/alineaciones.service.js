
const fs = require("fs");
const path = require("path");

const rutaAlineaciones = path.join(__dirname, "../data/alineaciones.json");

// Obtener todas las alineaciones
function obtenerAlineaciones() {
    const contenido = fs.readFileSync(rutaAlineaciones, "utf-8");
    return JSON.parse(contenido);
}

// Guardar una nueva alineación
function guardarAlineacion(alineacion) {
    const alineaciones = obtenerAlineaciones();

    alineaciones.push(alineacion);

    fs.writeFileSync(
        rutaAlineaciones,
        JSON.stringify(alineaciones, null, 2)
    );

    return alineacion;
}

function eliminarAlineacion(id) {
    const alineaciones = obtenerAlineaciones();

    const nuevasAlineaciones = alineaciones.filter(
        alineacion => alineacion.id !== id
    );

    fs.writeFileSync(
        rutaAlineaciones,
        JSON.stringify(nuevasAlineaciones, null, 2)
    );

    return nuevasAlineaciones.length !== alineaciones.length;
}


module.exports = {
    obtenerAlineaciones,
    guardarAlineacion,
    eliminarAlineacion
};