// Dependencies
const express = require('express');
const path = require('path');

// Set up Express
const app = express();
const PORT = process.env.PORT || 4000;

// Setup express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
let reservations = [];
let waitlist = [];

// URL Routes
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/make-reservation', (req, res) => {
    res.sendFile(path.join(__dirname, 'make-reservation.html'));
});

app.get('/view-reservations', (req, res) => {
   res.sendFile(path.join(__dirname, 'view-reservations.html'));
});

// Post Routes
app.post('/api/reservations', (req, res) => {
   let newReservation = req.body;
   console.log(reservations.length);

   if ( reservations.length < 5 ) {
       reservations.push(newReservation);
   } else {
       waitlist.push(newReservation);
   }

   res.json(newReservation);
});

// JSON Routes
app.get('/api/reservations', (req, res) => {
    return res.json(reservations);
});

app.get('/api/waitlist', (req, res) => {
    return res.json(waitlist);
});

// Listener
app.listen(PORT, () => {
   console.log(`App listening on PORT: ${PORT}`);
});