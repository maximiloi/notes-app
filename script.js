const addButton = document.querySelector('.add'); // кнопка добавления заметки

const notes = JSON.parse(localStorage.getItem('notes')); // из ЛС достаем заметки

if (notes) { // если есть заметки
    notes.forEach(note => {
        addNewNote(note); // выводить каждую заметки на страницу
    });
}

function addNewNote(text = '') { // функция вывода заметки, если заметка есть выводить текст заметки если нет создавать новую
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
    <div class="notes">
        <div class="notes__tools tools">
            <i class="tools__button tools__button--edit fas fa-edit"></i>
            <i class="tools__button tools__button--delete fas fa-trash-alt"></i>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="main__textarea ${text ? "hidden" : ""}" name="" id=""></textarea>
    </div>
    `;

    const editButton = note.querySelector('.tools__button--edit'); // элементы с которыми работаем
    const deleteButton = note.querySelector('.tools__button--delete');

    const main = note.querySelector('.main');
    const textArea = note.querySelector('.main__textarea');

    textArea.value = text; // из тексареа получаем значение
    main.innerHTML = marked(text); // выводдим написаное через плагин marked

    editButton.addEventListener('click', () => {  // кнопка редактирования 
        main.classList.toggle('hidden'); // меняем классы
        textArea.classList.toggle('hidden');
    });

    deleteButton.addEventListener('click', () => { // удаление заметки
        note.remove();
    });

    textArea.addEventListener('input', (e) => {  // выводим набранное в текстарена
        const { value } = e.target; // в обьект добавляем введенный текст

        main.innerHTML = marked(value); // выводдим написаное через плагин marked

        updateLS(); // запускаем функцию обновления ЛС
    });

    document.body.appendChild(note); // добавляем заметку на страницу
}

function updateLS() { // функция обновления ЛС с заметками
    const notesText = document.querySelectorAll('textarea'); // собирем коллекцию заметок
    const notes = []; // пустой вспомогательный массив

    notesText.forEach(note => { // перебираем колекцию и в доп.массив записываем значения из коллекции
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes)); // отправляем массив в ЛС
}

addButton.addEventListener('click', () => { // добавить заметку
    addNewNote(); // вызвать функцию для новой заметки
});
