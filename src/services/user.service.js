const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');
const User = require('../models/user.model');

class UserService {
  async register({ name, email, password, role }) {
    if (!name || !email || !password) {
      throw new Error('Todos los campos son obligatorios');
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await userRepository.findByEmail(cleanEmail);
    if (existingUser) {
      throw new Error('El correo electrónico ya se encuentra registrado');
    }

    const validRoles = Object.values(User.ROLES);
    const assignedRole = validRoles.includes(role) ? role : User.ROLES.CLIENT;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userRepository.create({
      id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: assignedRole,
      createdAt: new Date().toISOString()
    });

    return newUser.toSafeObject();
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Por favor ingresa tu correo y contraseña');
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await userRepository.findByEmail(cleanEmail);
    if (!user) {
      throw new Error('Credenciales inválidas. Verifica tu correo y contraseña');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Credenciales inválidas. Verifica tu correo y contraseña');
    }

    return user.toSafeObject();
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    return user ? user.toSafeObject() : null;
  }
}

module.exports = new UserService();
