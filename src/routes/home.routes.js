const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');
const { isAuthenticated } = require('../middlewares/auth.middleware');

// Landing page principal
router.get('/', homeController.showHomePage);

// Navegación multipágina (páginas propias)
router.get('/nosotros', homeController.showAbout);
router.get('/servicios', homeController.showServices);
router.get('/tienda', homeController.showShop);
router.get('/blog', homeController.showBlog);
router.get('/contacto', homeController.showContact);

// Dashboard protegido tras login
router.get('/dashboard', isAuthenticated, homeController.showDashboard);

module.exports = router;
