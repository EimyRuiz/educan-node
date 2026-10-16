const userService = require('../services/user.service');
const User = require('../models/user.model');

class AuthController {
  // Renderiza el formulario de login
  showLoginForm(req, res) {
    res.render('pages/login', {
      title: 'Iniciar Sesión | EDUCAN'
    });
  }

  // Procesa el inicio de sesión
  async handleLogin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await userService.login({ email, password });
      
      // Guardar sesión (sin la contraseña)
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      req.flash('success', `¡Bienvenido de nuevo, ${user.name}!`);

      // Redirigir según el rol
      return res.redirect('/dashboard');
    } catch (error) {
      req.flash('error', error.message || 'Error al iniciar sesión');
      return res.redirect('/auth/login');
    }
  }

  // Renderiza el formulario de registro
  showRegisterForm(req, res) {
    res.render('pages/register', {
      title: 'Registro de Usuario | EDUCAN',
      roles: User.ROLES
    });
  }

  // Procesa el registro de nuevo usuario
  async handleRegister(req, res) {
    const { name, email, password, confirmPassword, role } = req.body;

    try {
      if (password !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      if (password.length < 6) {
        throw new Error('La contraseña debe contener al menos 6 caracteres');
      }

      const newUser = await userService.register({ name, email, password, role });

      // Iniciar sesión automáticamente o invitar a loguearse
      req.session.user = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      };

      req.flash('success', '¡Cuenta creada con éxito! Bienvenido a la comunidad EDUCAN.');
      return res.redirect('/dashboard');
    } catch (error) {
      req.flash('error', error.message || 'Error en el registro');
      return res.redirect('/auth/register');
    }
  }

  // Cierra la sesión
  handleLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/auth/login');
    });
  }
}

module.exports = new AuthController();
