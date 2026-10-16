const fs = require('fs');
const path = require('path');
const User = require('../models/user.model');

class UserRepository {
  constructor() {
    this.filePath = path.join(__dirname, '../../data/users.json');
    this._ensureStorage();
  }

  _ensureStorage() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2), 'utf-8');
    }
  }

  _readData() {
    try {
      const content = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(content || '[]');
    } catch (error) {
      console.error('Error al leer el archivo de usuarios:', error);
      return [];
    }
  }

  _writeData(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (error) {
      console.error('Error al guardar en el archivo de usuarios:', error);
      return false;
    }
  }

  async findAll() {
    const usersData = this._readData();
    return usersData.map(u => new User(u));
  }

  async findById(id) {
    const usersData = this._readData();
    const found = usersData.find(u => u.id === id);
    return found ? new User(found) : null;
  }

  async findByEmail(email) {
    const usersData = this._readData();
    const normalizedEmail = (email || '').trim().toLowerCase();
    const found = usersData.find(u => u.email.toLowerCase() === normalizedEmail);
    return found ? new User(found) : null;
  }

  async create(userData) {
    const usersData = this._readData();
    const newUser = new User(userData);
    usersData.push(newUser);
    this._writeData(usersData);
    return newUser;
  }
}

module.exports = new UserRepository();
