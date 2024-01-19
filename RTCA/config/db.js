// database.js
const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database (file: chat_app.db)
const db = new sqlite3.Database('chat_app.db');

// Create User table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS User (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      email TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create ChatRoom table
  db.run(`
    CREATE TABLE IF NOT EXISTS ChatRoom (
      room_id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_name TEXT UNIQUE,
      created_by_user_id INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by_user_id) REFERENCES User(user_id)
    )
  `);

  // Create Message table
  db.run(`
    CREATE TABLE IF NOT EXISTS Message (
      message_id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id INTEGER,
      sender_user_id INTEGER,
      content TEXT,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (room_id) REFERENCES ChatRoom(room_id),
      FOREIGN KEY (sender_user_id) REFERENCES User(user_id)
    )
  `);
});

module.exports = db;
