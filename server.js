
const express = require("express");
const path = require("path");
const jugadoresRoutes = require("./routes/jugadores.routes");
const app = express();
const PORT = 3000;
const alineacionesRoutes = require("./routes/alineaciones.routes");
// Permite recibir datos en formato JSON
app.use(express.json());

// Usar las rutas de jugadores
app.use("/api/jugadores", jugadoresRoutes);

// Usar las rutas de alineaciones
app.use("/api/alineaciones", alineacionesRoutes);

// Permite mostrar los archivos de nuestra página web
app.use(express.static(path.join(__dirname, "public")));
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "principal.html"));
});
// Primera ruta de prueba de nuestra API
app.get("/api", function(req, res) {
    res.json({
        mensaje: "API de Mundial Players funcionando correctamente"
    });
});

// Iniciar el servidor
app.listen(PORT, function() {
    console.log("Servidor funcionando en http://localhost:" + PORT);
});
