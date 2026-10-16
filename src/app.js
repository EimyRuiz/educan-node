const path = require('path');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const appConfig = require('./config/app.config');

const authRoutes = require('./routes/auth.routes');
const homeRoutes = require('./routes/home.routes');

const app = express();

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares para procesar body (JSON y URL Encoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Sesiones
app.use(session(appConfig.session));

// Flash messages
app.use(flash());

// Variables globales disponibles en todas las vistas EJS
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.successMessage = req.flash('success');
  res.locals.errorMessage = req.flash('error');
  res.locals.currentPath = req.path;
  next();
});

// Rutas de la aplicación
app.use('/', homeRoutes);
app.use('/auth', authRoutes);

// Manejo de 404
app.use((req, res) => {
  res.status(404).render('pages/error', {
    title: 'Página no encontrada | EDUCAN',
    message: 'La página que buscas no existe o ha sido movida.'
  });
});

// Manejo global de errores 500
app.use((err, req, res, next) => {
  console.error('Error interno del servidor:', err);
  res.status(500).render('pages/error', {
    title: 'Error Interno | EDUCAN',
    message: 'Ocurrió un error en el servidor. Por favor intenta más tarde.'
  });
});

// Iniciar servidor
app.listen(appConfig.port, () => {
  console.log(`=============================================`);
  console.log(`🐾 Servidor EDUCAN iniciado con éxito`);
  console.log(`🌐 URL: http://localhost:${appConfig.port}`);
  console.log(`⚙️  Entorno: ${appConfig.nodeEnv}`);
  console.log(`=============================================`);
});

module.exports = app;
