// Dependencies
const express = require('express');
const path = require('path');

// Initialize
const app = express();
const PORT = process.env.PORT || 3000;

// Variables
let reservations = [];
let waitlist = [];

// Content Routes
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/reserve', (req, res) => {
   res.sendFile(path.join(__dirname, 'reserve.html'));
});

app.get('/tables', (req, res) => {
   res.sendFile(path.join(__dirname, 'tables.html'));
});

// JSON Routes
app.post('api/tables', (req, res) => {
   let newReservation = req.body;

   if (reservations.length <= 5) {
       reservations.push(newReservation);
   } else {
      app.post('api/waitlist', (req, res) => {
         waitlist.push(newReservation);
      })
   }
    res.json(newReservation);
});

app.get('/api/reservations', (req, res) => {
   reservations.forEach( (i) => {
      return res.json(reservations[i]);
   })
});

app.get('/api/waitlist', (req, res) => {
   waitlist.forEach( (i) => {
      return res.json(waitlist[i]);
   })
});

// Listener
app.listen(PORT, () => {
   console.log(`App listening on PORT: ${PORT}`);
});