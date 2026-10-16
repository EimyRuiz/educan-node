class User {
  constructor({ id, name, email, password, role, createdAt = new Date().toISOString() }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role || User.ROLES.CLIENT;
    this.createdAt = createdAt;
  }

  static get ROLES() {
    return {
      CLIENT: 'Cliente',
      TRAINER: 'Adiestrador',
      ADMIN: 'Administrador'
    };
  }

  // Sanitiza el objeto eliminando datos sensibles
  toSafeObject() {
    const { password, ...safeUser } = this;
    return safeUser;
  }
}

module.exports = User;
