
const selecciones = [
    ["Argentina", "🇦🇷"],
    ["Alemania", "🇩🇪"],
    ["Argelia", "🇩🇿"],
    ["Australia", "🇦🇺"],
    ["Países Bajos", "🇳🇱"],
    ["Bélgica", "🇧🇪"],
    ["Brasil", "🇧🇷"],
    ["Colombia", "🇨🇴"],
    ["Croacia", "🇭🇷"],
    ["Egipto", "🇪🇬"],
    ["España", "🇪🇸"],
    ["Estados Unidos", "🇺🇸"],
    ["Francia", "🇫🇷"],
    ["Inglaterra", "GB"],
    ["Portugal", "🇵🇹"],
    ["Uruguay", "🇺🇾"]
];

// Crear los equipos a partir de las selecciones
const equipos = selecciones.map(function(seleccion) {
    return {
        nombre: seleccion[0],
        bandera: seleccion[1],
        jugadores: []
    };
});

// Jugadores iniciales
const jugadoresIniciales = [
    {
        id: "messi",
        nombre: "Lionel Messi",
        seleccion: "Argentina",
        posicion: "Delantero",
        dorsal: 10,
        imagen: "img/messi.jpg"
    },
    {
        id: "julian",
        nombre: "Julián Álvarez",
        seleccion: "Argentina",
        posicion: "Delantero",
        dorsal: 9,
        imagen: "img/julian.jpg"
    },
    {
        id: "enzo",
        nombre: "Enzo Fernández",
        seleccion: "Argentina",
        posicion: "Mediocampista",
        dorsal: 8,
        imagen: "img/enzo.jpg"
    },
    {
        id: "dibu",
        nombre: "Emiliano Martínez",
        seleccion: "Argentina",
        posicion: "Arquero",
        dorsal: 23,
        imagen: "img/dibu.jpg"
    },
    {
        id: "cuti",
        nombre: "Cristian Romero",
        seleccion: "Argentina",
        posicion: "Defensor",
        dorsal: 13,
        imagen: "img/cuti.jpg"
    },
    {
        id: "mbappe",
        nombre: "Kylian Mbappé",
        seleccion: "Francia",
        posicion: "Delantero",
        dorsal: 10,
        imagen: "img/mbappe.jpg"
    },
    {
        id: "cristiano",
        nombre: "Cristiano Ronaldo",
        seleccion: "Portugal",
        posicion: "Delantero",
        dorsal: 7,
        imagen: "img/cristiano.jpg"
    },
    {
        id: "lamine",
        nombre: "Lamine Yamal",
        seleccion: "España",
        posicion: "Delantero",
        dorsal: 19,
        imagen: "img/lamine.jpg"
    },
    {
        id: "neymar",
        nombre: "Neymar Jr",
        seleccion: "Brasil",
        posicion: "Delantero",
        dorsal: 10,
        imagen: "img/neymar.jpg"
    }
];

// Agregar cada jugador a su selección
jugadoresIniciales.forEach(function(jugador) {
    const equipo = equipos.find(function(seleccion) {
        return seleccion.nombre === jugador.seleccion;
    });

    if (equipo) {
        equipo.jugadores.push(jugador);
    }
});
