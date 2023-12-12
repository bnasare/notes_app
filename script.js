/**
 * This script manages a simple note-taking application using HTML, CSS, and JavaScript.
 * It allows users to add, edit, and delete notes, and stores the notes in the browser's localStorage.
 */

// Get references to HTML elements
const addButton = document.getElementById('add');
const deleteAll = document.getElementById('clear');

// Retrieve existing notes from localStorage or initialize an empty array
const notes = JSON.parse(localStorage.getItem('notes'));

// If there are existing notes, display them on the page
if (notes) {
    notes.forEach(note => addNewNote(note));
}

// Event listener for the "Add" button to create a new note
addButton.addEventListener("click", () => addNewNote());

// Event listener for the "Delete All" button to remove all notes
deleteAll.addEventListener("click", () => deleteAllNotes());

/**
 * Function to delete all notes from the page and update localStorage.
 */
function deleteAllNotes() {
    const notes = document.querySelectorAll(".note");
    notes.forEach(note => note.remove());

    // Update localStorage after removing all notes
    updateLS();
}

/**
 * Function to add a new note to the page.
 * @param {string} text - The initial text content of the note (default is an empty string).
 */
function addNewNote(text = "") {
    // Create a new note container element
    const note = document.createElement('div');
    note.classList.add('note');

    // Set the HTML content for the note
    note.innerHTML = `<div class="operation">
        <button id="operationButton" class="edit"><i class="fas fa-edit"></i></button>
        <button id="operationButton" class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`;

    // Get references to the note's elements
    const editButton = note.querySelector(".edit");
    const deleteButton = note.querySelector(".delete");
    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    // Set initial values for the main content and textarea
    textArea.value = text;
    main.innerHTML = text;

    // Event listener for the "Delete" button to remove the note and update localStorage
    deleteButton.addEventListener("click", () => {
        note.remove();
        updateLS();
    });

    // Event listener for the "Edit" button to toggle visibility of main content and textarea
    editButton.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    // Event listener for input in the textarea to update the main content and localStorage
    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = value;
        updateLS();
    });

    // Append the new note to the document body
    document.body.appendChild(note);
}

/**
 * Function to update localStorage with the current content of all notes.
 */
function updateLS() {
    // Get references to all textarea elements
    const notesText = document.querySelectorAll('textarea');

    // Create an array to store the text content of each note
    const notes = [];

    // Populate the notes array with the text content of each note
    notesText.forEach(note => {
        notes.push(note.value);
    });

    // Update localStorage with the array of note text
    localStorage.setItem('notes', JSON.stringify(notes));
}
