// const box = document.querySelector('.box')
// const addBtn = document.querySelector('#addBtn')

// const items = [ 1, 2, 3]

// function cteateUi () {
//     box.innerHTML = ''
//     for ( item of items) {   
//     box.innerHTML += '<p class="paraqraf-${item}">Test ${item}</p>'
//     }
// }

// addBtn.addEventListener('click', () =>{
//     items.push(items.length + 1);
//     createUi ();
// })

// createUi ();


// const taskInput = document.querySelector('#taskInput')
// const btnSave = document.querySelector('#btnSave')
// const taskList = document.querySelector('#taskList')

// const tasks = ['task 1', 'task 2', 'task 3'];

// const taskLi = (index) => {
//     return `
//     <li class="flex border p-2 items-center justify-between bg-blue-100 rounded-lg shadow-md">
    
//     <span class="flex items-center justify-between"><input type="checkbox" class="mr-1"> ${tasks[index]}</span>
//     <div class="flex items-center justify-between">
//     <button class="size-5 flex bg-blue-500 mr-1 text-white items-center justify-center rounded-full w-8 h-8 hover:bg-red-600"><i class="fa-solid fa-pen"></i></button>
//     <button onclick='deleteTask()' class="flex size-5 bg-red-500 text-white items-center justify-center rounded-full w-8 h-8 hover:bg-red-600"><i class="fa-solid fa-trash"></i></button></div>
//     </li>`
// }

// function deleteTask (index){
//     tasks.splice(index, 1)
//     cteateUi()
// }

// const cteateUi = () => {
//     taskList.innerHTML = ''
//     for (let  index in tasks) {   
//       taskList.innerHTML += taskLi(index);
//     }
// }
// cteateUi();

// btnSave.addEventListener('click', () => {
//     tasks.push(taskInput.value);
//     taskInput.value = ''
//     cteateUi();
// })


const taskInput = document.querySelector('#taskInput');
const btnSave = document.querySelector('#btnSave');
const taskList = document.querySelector('#taskList');
const btnAll = document.querySelector('#btnAll');
const btnCompleted = document.querySelector('#btnCompleted');
const btnPending = document.querySelector('#btnPending');

let tasks = [
    { text: 'task 1', completed: false },
    { text: 'task 2', completed: true },
    { text: 'task 3', completed: false }
];


let editIndex = -1;

const taskLi = (task, index) => {
    return `
    <li class="flex border p-2 items-center justify-between bg-blue-100 rounded-lg shadow-md ">
        <span class="flex items-center ${task.completed ? 'line-through' : ''}">
            <input type="checkbox" class="mr-1" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
            ${task.text}
        </span>
        <div class="flex items-center justify-between">
            <button onclick="editTask(${index})" class="size-5 flex bg-blue-500 mr-1 text-white items-center justify-center rounded-full w-8 h-8 hover:bg-blue-600"><i class="fa-solid fa-pen"></i></button>
            <button onclick="deleteTask(${index})" class="flex size-5 bg-red-500 text-white items-center justify-center rounded-full w-8 h-8 hover:bg-red-600"><i class="fa-solid fa-trash"></i></button>
        </div>
    </li>`;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    createUi();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    createUi();
}

function editTask(index) {
    taskInput.value = tasks[index].text;
    btnSave.textContent = "Save";
    editIndex = index;
}

const createUi = (filter = 'all') => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        if (filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'pending' && !task.completed)) {
            taskList.innerHTML += taskLi(task, index);
        }
    });
}
createUi();

btnSave.addEventListener('click', (e) => {
    e.preventDefault(); // Formun default göndərilmə davranışını dayandır
    const taskText = taskInput.value.trim();
    if (taskText) {
        if (editIndex === -1) {
            tasks.push({ text: taskText, completed: false });
        } else {
            tasks[editIndex].text = taskText;
            editIndex = -1;
            btnSave.textContent = "Add";
        }
        taskInput.value = '';
        createUi();
    }
});

btnAll.addEventListener('click', () => createUi('all'));
btnCompleted.addEventListener('click', () => createUi('completed'));
btnPending.addEventListener('click', () => createUi('pending'));

