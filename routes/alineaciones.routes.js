

const express = require("express");
const router = express.Router();

const alineacionesController = require("../controllers/alineaciones.controller");

// Obtener todas las alineaciones
router.get("/", alineacionesController.obtenerAlineaciones);

// Eliminar una alineación
router.delete("/:id", alineacionesController.eliminarAlineacion);

// Guardar una nueva alineación
router.post("/", alineacionesController.guardarAlineacion);

module.exports = router;
