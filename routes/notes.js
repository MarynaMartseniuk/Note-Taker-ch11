const notes = require('express').Router();

// a get URL 'localhost:3001/api/notes' request from user will bring/display to user the db.json file with all saved notes as JSON.
  notes.get('/api/notes', (req, res) => {
    res.json(notesData)
  });

  notes.get('/api/notes/:id', (req, res) => {
    res.json(notesData)
  }); 
  
  notes.post('/api/notes', (req, res) => {
    res.json(notesData)
  });

  notes.delete('/api/notes/:id', (req, res) => {
    res.json(notesData)
  });