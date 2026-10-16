const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { isGuest, isAuthenticated } = require('../middlewares/auth.middleware');

// Rutas accesibles para invitados (no logueados)
router.get('/login', isGuest, authController.showLoginForm);
router.post('/login', isGuest, authController.handleLogin);

router.get('/register', isGuest, authController.showRegisterForm);
router.post('/register', isGuest, authController.handleRegister);

// Cerrar sesión (requiere estar autenticado)
router.get('/logout', isAuthenticated, authController.handleLogout);
router.post('/logout', isAuthenticated, authController.handleLogout);

module.exports = router;
