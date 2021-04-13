const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

//Usando template engine.
server.set('view engine', 'ejs');

// Mudar a localizaçãoda pasta views.
server.set('views', path.join(__dirname, 'views'));

//habilitar arquivos estáticos
server.use(express.static("public"));

//request, response
/* server.get('/', (request, response) => {
    //console.log('entrei no servidor')
    //console.log(__dirname + "/views/index.html")
    //return response.send('Oi')
    //return response.sendFile("/f/Silva/Cursos/RocketSeat/Maratona Discover - 02/maratona-discover-02-1.0.0/index.html")
    return response.sendFile(__dirname + "/views/index.html")
}) */

//Habilitar o uso do req.body.
server.use(express.urlencoded({ extended: true }));

//routes
server.use(routes);

//console.log(server)
server.listen(3000, () => console.log('rodando'));

