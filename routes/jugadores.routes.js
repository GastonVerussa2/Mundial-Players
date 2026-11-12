const express = require("express");
const router = express.Router();

const jugadoresController = require("../controllers/jugadores.controller");

router.get("/", jugadoresController.obtenerJugadores);

router.get("/:id", jugadoresController.obtenerJugadorPorId);

module.exports = router;