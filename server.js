//1.consts declaation:
const express = require('express');
const path = require('path');
const fs = require('fs');

const notesData = require('./db/db.json');
const id = require('./helpers/id.js');
// const api = require('./routes/index.js');
//const api = require('./public/assets/js/index')

const app = express();
const PORT = 3000;

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
  console.log(res.json(notesData));

  
});





app.post('/api/notes', (req, res) => {
  
  // console.log(req.body);
   const { title, text } = req.body;
  console.log('hello 53');
  // reqNote = JSON.parse(req.body);
  if (req.body) {
    console.log('hello 56');
    const newNote = {
      title: title,
      text: text,
      id: id(),
    };
    console.log(newNote);
    // fs.appendFile('db.json', JSON.stringify(newNote));

    //fs.appendFile('db.json', newNote);

    fs.appendFile('./db/db.json', JSON.stringify(newNote), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Data successfully appended to file!');
      }
    });
  };

});

// fs.appendFile('filename.txt', 'Data to append', (err) => {
//   if (err) {
//     console.error('Error writing to file:', err);
//   } else {
//     console.log('Data successfully appended to file!');
//   }
// });






// a get URL 'localhost:3001/*' request from user will bring/display to user the landing page (home-page) , which is index.html file. '*' - stands for any user input
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

  

//4.listen to a port 
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} `)
  );


  