//server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());


const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true, 
}));
app.use(bodyParser.json());


const plainPassword = '123456789'; 
const saltRounds = 10; 

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);
  }
});
const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "", 
    database: "alphacutz",
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database.');
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.get('/api/reserved-times', (req, res) => {
    const { date } = req.query;
    db.query('SELECT selected_time FROM appointments WHERE date = ?', [date], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Database error' });
      }
      const reservedTimes = results.map(row => row.selected_time);
      res.json(reservedTimes);
    });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user in database
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            return res.status(500).json({ message: 'Database error.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No user found with this email.' });
        }

        const user = results[0]; // Get the user from the results

        // Compare the password with the stored hash
        const match = await bcrypt.compare(password, user.password);
        
        if (!match) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }

        // Proceed with login (e.g., generate token, etc.)
        res.json({ user });
    });
});

app.post('/api/appointments', (req, res) => {
    const { fullName, phoneNumber, date, selectedTime, service } = req.body;
    const sql = 'INSERT INTO appointments (full_name, phone_number, date, selected_time, service) VALUES (?, ?, ?, ?, ?)';
    
    db.query(sql, [fullName, phoneNumber, date, selectedTime, service], (error, results) => {
        if (error) {
            console.error('Error inserting appointment:', error); 
            return res.status(500).send(error);
        }
        res.status(201).send({ id: results.insertId });
    });
});

app.get('/api/appointments', (req, res) => {
    console.log('Received request for appointments');
    db.query('SELECT * FROM appointments', (error, results) => {
        if (error) {
            console.error('Error fetching appointments:', error);
            return res.status(500).json({ message: 'Error fetching appointments.' });
        }
        res.json(results);
    });
});
app.patch('/api/appointments/:id/confirm', (req, res) => {
    console.log('Received PATCH request to confirm appointment:', req.params.id);
    const id = req.params.id;
    const sql = 'UPDATE appointments SET isConfirmed = ? WHERE id = ?';
    db.query(sql, [1, id], (error, results) => {
        if (error) {
            console.error('Error updating appointment confirmation:', error);
            return res.status(500).json({ message: 'Error updating appointment.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }
        res.json({ message: 'Appointment confirmed successfully.' });
    });
});

app.patch('/api/appointments/:id/cancel', (req, res) => {
    const id = req.params.id;
    const sql = 'UPDATE appointments SET isConfirmed = ? WHERE id = ?';
    db.query(sql, [0, id], (error, results) => {
        if (error) {
            console.error('Error canceling appointment:', error);
            return res.status(500).json({ message: 'Error canceling appointment.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }
        res.json({ message: 'Appointment canceled successfully.' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});
