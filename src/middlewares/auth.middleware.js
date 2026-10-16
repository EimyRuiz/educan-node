/**
 * Middleware para comprobar si el usuario está autenticado
 */
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  req.flash('error', 'Debes iniciar sesión para acceder a este recurso');
  return res.redirect('/auth/login');
};

/**
 * Middleware para redirigir si ya tiene sesión activa (para login/register)
 */
const isGuest = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect('/dashboard');
  }
  return next();
};

/**
 * Middleware para verificar roles permitidos
 * @param  {...string} allowedRoles 
 */
const hasRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      req.flash('error', 'Debes iniciar sesión para realizar esta acción');
      return res.redirect('/auth/login');
    }

    if (!allowedRoles.includes(req.session.user.role)) {
      req.flash('error', 'No tienes los permisos necesarios para acceder a este apartado');
      return res.status(403).render('pages/error', {
        title: 'Acceso Denegado | EDUCAN',
        message: 'No posees los permisos necesarios para acceder a este recurso.'
      });
    }

    next();
  };
};

module.exports = {
  isAuthenticated,
  isGuest,
  hasRole
};
