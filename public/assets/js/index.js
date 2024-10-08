let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

// if URL is 'localhost:3001/notes' the take all this elements:
if (window.location.pathname === '/notes') {
  noteForm = document.querySelector('.note-form');
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  clearBtn = document.querySelector('.clear-btn');
  noteList = document.querySelectorAll('.list-container .list-group');
}

// ==================================================
// Show an element
// style attrebute to display an element. Use it for buttons (./css/style.css)
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
// style attrebute to delete from display an element. Use it for buttons (./css/style.css)
const hide = (elem) => {
  elem.style.display = 'none';
};

//===================================================
// activeNote is used to keep track of the note in the textarea
let activeNote = {};


//===================================================

// fetch requests to (./db/db.json)

// to display all notes from (./db/db.json) to the left-hand column notes list
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

// add a route to GET note by ID
// to display note (user has clicked on) (from the left-hand column notes list) in the right-hand column
const getIdNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

// to save a new note that was input by user
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  });

// to delete the note user click on the GARBAGE CAN (delete note button) by
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });


//================================================== 
// render necessary buttons
const renderActiveNote = () => {
  hide(saveNoteBtn);
  hide(clearBtn);

  if (activeNote.id) {
    show(newNoteBtn);
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    hide(newNoteBtn);
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

//===================================================
// Save a new note to (./db/db.json), then display updated noteList, then render necessary buttons.
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value
  };
  //An original code. Fix the bug: (.then) is not getting executed
  saveNote(newNote).then(() => {
    console.log('!!!!!!!new note should be saved, Check db.json!!!!!!!');
    getAndRenderNotes();
    renderActiveNote();
    console.log('done with note save and render!')
  });

  // saveNote(newNote);
  // console.log('A new note is saved! Check db.json!');

  // getAndRenderNotes();
  // console.log('An updated noteList is displayed! Find your new note in it!');
  // renderActiveNote();
  // console.log('done with note save and render!')
};

//===================================================
// Delete the clicked note, then display updated noteList, then render necessary buttons.
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

//===================================================
// Sets the activeNote, then render necessary buttons
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

//===================================================
// Sets the activeNote to and empty, render necessary buttons to allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  show(clearBtn);
  renderActiveNote();
};

// Renders the appropriate buttons based on the state of the form
const handleRenderBtns = () => {
  show(clearBtn);
  if (!noteTitle.value.trim() && !noteText.value.trim()) {
    hide(clearBtn);
  } else if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

//===================================================
// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });


  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

//===================================================
// Gets notes from the (./db/db.json) and renders them to the sidebar on the left-hand side.
const getAndRenderNotes = () => getNotes().then(renderNoteList);


//===================================================
// event listeners on the buttons when URL is 'localhost:3001/notes'
if (window.location.pathname === '/notes') {
  console.log('I am listerning on events!!!!!!!!!!!!!!!!!!!!!!!!!!');
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearBtn.addEventListener('click', renderActiveNote);
  noteForm.addEventListener('input', handleRenderBtns);
}

//===================================================
// call the function the displays notes list on the left-hand side. It will be called when URL is 'localhost:3001/notes'
getAndRenderNotes();
