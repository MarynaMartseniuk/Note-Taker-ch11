//1.consts declaation:
const express = require('express');
const path = require('path');

// const notesData = require('./db.json');
// const api = require('./routes/index');

const app = express();
const PORT = 3001;

// 2.Middleware:
// Middleware to use folder Public with static data
app.use(express.static('public'));
// Middleware to work with user's request using 'req.body' in a JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Send all 'localhost:3001/api' routes to the routes folder to use the index.js
// app.use('/api', api);

//3.routes
// sourse: UofU bootcamp, module 11, activity 05
// a get URL 'localhost:3001/notes' request from user will bring/display to user the notes.html file 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'))

    // display all existing notes in the left-hand column
    //renderNoteList();
    // all nav-btn are not visible
});

app.get('/api/notes', (req, res) => {
  //res.json(notesData);
  console.log('hi!');
  res.send('Hello World!')
  
});


// a get URL 'localhost:3001/*' request from user will bring/display to user the landing page (home-page) , which is index.html file. '*' - stands for any user input
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

  

//4.listen to a port 
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} `)
  );


  