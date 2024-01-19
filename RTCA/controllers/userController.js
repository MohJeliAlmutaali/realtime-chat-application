// userController.js
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

class UserController {
  static registerUser(req, res) {
    const { username, password, email } = req.body;

    // Validation: Check if required fields are present
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Please provide username, password, and email' });
    }

    // Check if the username is already taken
    UserModel.getUserByUsername(username, (err, user) => {
      if (user) {
        return res.status(400).json({ message: 'Username is already taken' });
      }

      // Create a new user and save to the database
      UserModel.createUser(username, password, email, (err) => {
        if (err) {
          console.error('Error saving user to the database:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        return res.json({ message: 'User registered successfully' });
      });
    });
  }

  static loginUser(req, res) {
    const { username, password } = req.body;

    // Validation: Check if required fields are present
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    // Check if the user exists and the password is correct
    UserModel.getUserByUsername(username, (err, user) => {
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ username, email: user.email }, 'secret_key', { expiresIn: '1h' });

      return res.json({ token });
    });
  }
}





  

module.exports = UserController;


module.exports = UserController;
