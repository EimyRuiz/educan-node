class HomeController {
  // Renderiza la Landing Page
  showHomePage(req, res) {
    res.render('pages/home', {
      title: 'EDUCAN | Adiestramiento Canino Profesional y Bienestar',
      user: req.session.user || null
    });
  }

  // Renderiza dashboard según rol (Placeholder funcional)
  showDashboard(req, res) {
    const user = req.session.user;
    res.render('pages/dashboard', {
      title: `Panel de ${user.role} | EDUCAN`,
      user
    });
  }

  // Páginas placeholder para navegación multipágina
  showAbout(req, res) {
    res.render('pages/placeholder', {
      title: 'Nosotros | EDUCAN',
      pageName: 'Nosotros',
      description: 'Conoce a nuestro equipo de etólogos y adiestradores caninos certificados.'
    });
  }

  showServices(req, res) {
    res.render('pages/placeholder', {
      title: 'Servicios de Entrenamiento | EDUCAN',
      pageName: 'Servicios',
      description: 'Programas personalizados para cachorros, modificación de conducta y obediencia avanzada.'
    });
  }

  showShop(req, res) {
    res.render('pages/placeholder', {
      title: 'Tienda Canina | EDUCAN',
      pageName: 'Tienda',
      description: 'Accesorios ergonómicos, juguetes interactivos y nutrición premium recomendada por adiestradores.'
    });
  }

  showBlog(req, res) {
    res.render('pages/placeholder', {
      title: 'Blog y Consejos | EDUCAN',
      pageName: 'Blog',
      description: 'Artículos semanales, guías de conducta y recomendaciones de salud para tu mascota.'
    });
  }

  showContact(req, res) {
    res.render('pages/placeholder', {
      title: 'Contacto | EDUCAN',
      pageName: 'Contacto',
      description: 'Ponte en contacto con nuestros especialistas para resolver cualquier duda.'
    });
  }
}

module.exports = new HomeController();
