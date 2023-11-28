const addButton = document.getElementById('add');
const deleteAll = document.getElementById('clear');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach(note => addNewNote(note));
}

addButton.addEventListener("click", () => addNewNote());
deleteAll.addEventListener("click", () => deleteAllNotes());

function deleteAllNotes() {
    const notes = document.querySelectorAll(".note");
    notes.forEach(note => note.remove());

    updateLS();
}

function addNewNote(text = "") {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `<div class="operation">
    <button id="operationButton" class="edit"><i class="fas fa-edit"></i></button>
    <button id="operationButton" class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`;

    const editButton = note.querySelector(".edit");
    const deleteButton = note.querySelector(".delete");
    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    textArea.value = text;
    main.innerHTML = text;

    deleteButton.addEventListener("click", () => {
        note.remove();

        updateLS();
    })

    editButton.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    })

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = value;

        updateLS();
    })

    document.body.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach(note => {
        notes.push(note.value);
    })

    localStorage.setItem('notes', JSON.stringify(notes));
}


