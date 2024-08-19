const router = require('express').Router();

//import file to work with api-routes for notes (for URL 'localhost:3001/api/notes')
const notesRouter = require('./notes.js');

//setup a URL 'localhost:3001/api/notes'
router.use('/notes', notesRouter);

module.exports = router;
