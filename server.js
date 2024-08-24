//1.consts declaation:
const express = require('express');
const path = require('path');
const fs = require('fs');

const notesData = require('./db/db.json');
const id = require('./helpers/id.js');
// const api = require('./routes/index.js');
//const api = require('./public/assets/js/index')

const app = express();
const PORT = 3001;

// 2.Middleware:
// Middleware to use folder Public with static data
app.use(express.static('public'));
// Middleware to work with user's request using 'req.body' in a JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Send all 'localhost:3001/api' routes to the routes folder to use the index.js
//app.use('/api', api);



//3.routes
// sourse: UofU bootcamp, module 11, activity 05
// a get URL 'localhost:3001/notes' request from user will bring/display to user the notes.html file 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
    console.log('@@@@@@@@@@@@@@@code got inside of app.get(/notes) on a server.js');
});


app.get('/api/notes', (req, res) => {
  
  res.json(notesData);
  console.log('###############code got inside of app.get(/api/notes) on a server.js');
  // console.log(res.json(notesData));
 
});

app.post('/api/notes', (req, res) => {
  
  // console.log(req.body);
  console.log('hello 45');
  const { title, text } = req.body;
  console.log('hello 47');
  // source of codefor unique UD: UofU bootcamp, module# 11, activity #21
  if (req.body) {
    console.log('hello 50');
    const newNote = {
      title: title,
      text: text,
      id: id(),
    };
    console.log(newNote);
    console.log('hello 57');

    // function appendNewNote(newData) {
    const  appendNewNote = (newData) => {
      // let's get data from db.json, then add new data (a new note) to it, and then write updated data to db.json. So this way we can add a new data correctly (inside of an existing array)
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {

          console.error(err);
          return;

        } else {

          console.log(data);
          console.log('hello 67')
          const fileData = JSON.parse(data);
          console.log(fileData);
          console.log('hello 70');
          fileData.push(newData);
          
          fs.writeFile('./db/db.json', JSON.stringify(fileData), err => {
            if (err) {
              console.error(err);
            };
          });

        };

      });
     
    };

    appendNewNote(newNote);

  };

});


// a get URL 'localhost:3001/*' request from user will bring/display to user the landing page (home-page) , which is index.html file. '*' - stands for any user input
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

  

//4.listen to a port 
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} `)
  );


  