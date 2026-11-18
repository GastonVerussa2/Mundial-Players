#  Mundial Players

Mundial Players es una aplicación web dedicada al fútbol y a los jugadores de distintas selecciones nacionales.

El proyecto permite consultar información de jugadores, conocer sus características y crear alineaciones personalizadas.

## Tecnologías utilizadas

- HTML5: estructura de las páginas.
- CSS3: diseño y adaptación a distintos dispositivos.
- JavaScript: interactividad y funcionalidades.
- Node.js: entorno de ejecución del servidor.
- Express: creación del servidor y la API REST.
- JSON: almacenamiento de jugadores y alineaciones.

# Funcionalidades

#  Jugadores
- Visualización de jugadores.
- Consulta de información individual.
- Información de selección, posición, dorsal, fecha de nacimiento, altura y club.

# Armá tu 11
- Creación de alineaciones personalizadas.
- Formaciones 4-3-3, 4-4-2 y 3-5-2.
- Selección de jugadores mediante una ventana visual.
- Búsqueda de jugadores por selección.
- Prevención de jugadores repetidos.
- Guardado, carga y eliminación de alineaciones.

# API REST
- Consulta de jugadores.
- Consulta de jugadores por identificador.
- Gestión de información mediante endpoints.

#  Estructura del proyecto

```text
Mundial-Players/
│
├── controllers/
├── data/
│   ├── jugadores.json
│   └── alineaciones.json
│
├── public/
│   ├── css/
│   ├── js/
│   ├── img/
│   ├── principal.html
│   ├── jugadores.html
│   └── alineacion.html
│
├── routes/
├── services/
├── server.js
├── package.json
└── README.md
```

# Instalación y ejecución

# 1. Clonar el repositorio

```bash
git clone https://github.com/Randalpereda/Mundial-Players.git
```

### 2. Entrar en la carpeta

```bash
cd Mundial-Players
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Iniciar el servidor

```bash
node server.js
```

### 5. Abrir la aplicación

Ingresar desde el navegador a:

http://localhost:3000

# Almacenamiento

La aplicación utiliza archivos JSON para almacenar la información.

- `jugadores.json`: contiene los datos de los jugadores.
- `alineaciones.json`: almacena las alineaciones creadas por los usuarios.

Las alineaciones permanecen guardadas aunque se cierre el navegador o se reinicie el servidor.

#  Autores
Randal Agustin Pereda fai-2389.
