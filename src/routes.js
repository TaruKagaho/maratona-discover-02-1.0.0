//cria o servidor
const express = require('express');
//cria rotas de acesso
const routes = express.Router();
//cria caminho base
//Não é necessário para o EJS caso a pasta /views esteja na raiz!
//const basePath = __dirname + "/views";
//const views = __dirname + "/views/";

//Importar os controllers do profile.
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const DashboardController = require('./controllers/DashboardController');

//request, response
//(request, response) = (req, res)
/* routes.get('/', (request, response) => {
    //console.log('entrei no servidor')
    //console.log(__dirname + "/views/index.html")
    //return response.send('Oi')
    //return response.sendFile("/f/Silva/Cursos/RocketSeat/Maratona Discover - 02/maratona-discover-02-1.0.0/index.html")
    return response.sendFile(basePath + "/index.html")
}) */

routes.get('/', DashboardController.index);
routes.get('/job', JobController.create);
routes.post('/job', JobController.save);
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete); 
routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

module.exports = routes;

