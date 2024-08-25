//1. CONSTs declaration:

const express = require('express');
const path = require('path');
const fs = require('fs');

const notesData = require('./db/db.json');
const id = require('./helpers/id.js');

// // setup routes folder:
// const api = require('./routes/index.js');

const app = express();
const PORT = 3001;

// 2. MIDDLEWEAR:

// Middleware to use Public folder  with static data
app.use(express.static('public'));
// Middleware to work with user's request using 'req.body' in a JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Send all 'localhost:3001/api' routes to the routes folder to use the index.js
//app.use('/api', api);

//3. ROUTES:

// sourse: UofU bootcamp, module 11, activity 05
// a get request for URL 'localhost:3001/notes' route  will bring/display the notes.html file 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
    console.log('@@@@@@code got inside of app.get(/notes) on a server.js and has rendered notes.html page');
});

// a get request for URL 'localhost:3001/notes' route  will get data from ('./db/db.json') in json format.
app.get('/api/notes', (req, res) => {
  console.log('#####code got inside of app.get(/api/notes) on a server.js');
  res.json(notesData);
  // console.log(notesData);
});

// a get request for URL 'localhost:3001/notes/:id' route  will get data for requested id from ('./db/db.json') in json format.
app.get('/api/notes/:id', (req, res) => {
  console.log('?????code got inside of app.get(/api/notes/:id) on a server.js');

  // console.log('notesData array from db.json has following data:')
  // console.log(notesData);
  // console.log(notesData[0].id);
  // console.log(notesData.length);
  // console.log('user requested a note from db.json by the following ID:')
  // console.log(req.params.id);
  // console.log('Was ID displayed above?');
  
  // do a loop through the noteList and find the nte from it with ID that matches user req ID
  for (let i = 0; i < notesData.length; i++) {
    if (req.params.id === notesData[i].id) {
      // console.log(notesData[i]);
      return res.json(notesData[i]);
    }
  };
  return res.json('requested DATA was not found');
});

// a post request for URL 'localhost:3001/notes' route  will save a new note data to ('./db/db.json').
app.post('/api/notes', (req, res) => {
  
  console.log('hello 45');
  const { title, text } = req.body;
  console.log(req.body);
  console.log('hello 47');

  // source of codefor unique UD: UofU bootcamp, module# 11, activity #21
  // if req.body exists then create a newNote={} with the user input
  if (req.body) {
    console.log('hello 50');
    const newNote = {
      title: title,
      text: text,
      id: id(),
    };
    console.log(newNote);
    console.log('hello 57');

    // a function that takes from db.json data, addes to it a newNote={}, and writes to db.json updated data
    const  appendNewNote = (newData) => {
      // let's get data from db.json, then add new data (a new note) to it, and then write updated data to db.json. So this way we can add a new data correctly (inside of an existing array)
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {

          console.error(err);
          return;

        } else {

          console.log('hello 96')
          console.log(data);
          console.log('hello 98')

          const fileData = JSON.parse(data);

          console.log(fileData);
          console.log('hello 103');
          console.log(typeof(newData));

          fileData.push(newData);

          console.log(fileData);
          console.log('hello 109');

          fs.writeFile('./db/db.json', JSON.stringify(fileData), err => {
            if (err) {
              console.error(err);
            };
            console.log('new note is added to db')
          });
          console.log('hello 117');
          console.log(fileData);
          console.log('hello 119');
        };
        console.log('hello 121');
        
        
      });
      console.log('hello 259');
    };
    console.log('hello 127')
    appendNewNote(newNote);
  };
  return res.json(notesData);
});

// a delete request for URL 'localhost:3001/notes/:id' route  will delete a note data by id from ('./db/db.json'). Event Listener is seted up on delete button in index.js (delBtnEl.addEventListener())
app.delete('/api/notes/:id', (req, res) => {
  console.log('&&&&&code got inside of app.delete(/api/notes/:id) on a server.js');

  // console.log('notesData array from db.json has following data:')
  // console.log(notesData);
  // console.log(notesData[0].id);
  // console.log(notesData.length);
  // console.log('user requested a note from db.json by the following ID:')
  // console.log(req.params.id);
  // console.log('Was ID displayed above?');
  
  for (let i = 0; i < notesData.length; i++) {
    if (req.params.id === notesData[i].id) {
      
      notesData.splice(i, 1);
      fs.writeFile('./db/db.json', JSON.stringify(notesData), err => {
        if (err) {
          console.error(err);
        };
      });

    }
  };
  return res.json(notesData);
});

// a get URL 'localhost:3001/*' request from user will bring/display to user the landing page (home-page) , which is index.html file. '*' - stands for any user input
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

//4.listen to a port 
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} `)
  );