// userModel.js
const db = require('../config/db');

class UserModel {
  static createUser(username, password, email, callback) {
    db.run('INSERT INTO User (username, password, email) VALUES (?, ?, ?)', [username, password, email], callback);
  }

  static getUserByUsername(username, callback) {
    db.get('SELECT * FROM User WHERE username = ?', [username], callback);
  }
}

module.exports = UserModel;
