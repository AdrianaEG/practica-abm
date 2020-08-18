const express = require('express');
const app = express();
const methodOverride = require('method-override');

//Importo el middleware
//const logMiddleware = require('./middlewares/log');
//const maintenanceMode = require('./middlewares/maintenance');


// Configuración
// Las vistas tienen extension .ejs
// Las vistas están en la carpeta views
app.set('view engine', 'ejs');


// Template Engines
app.use(express.static('public'));

//Implemento el middleware
//app.use(logMiddleware);

//middleware
//app.use(maintenanceMode);


// Formularios
app.use(express.urlencoded({ extended: false }));//middleware que arma el objeto body
app.use(methodOverride('_method'));// middleware que Verifica si existe el method en el query string

// Rutas
const mainRoutes = require('./routes/index');
const groupsRoutes = require('./routes/groups');

app.use('/', mainRoutes);
app.use('/groups', groupsRoutes);

// Servidor
app.listen(3000, () => { console.log('Servidor funcionando en el puerto 3000.') })