'use strict';

let todoControl = document.querySelector('.todo-control');
let headerInput = document.querySelector('.header-input');
let todoList = document.querySelector('.todo-list');
let todoCompleted = document.querySelector('.todo-completed');

let compare = function(a, b) {
    return (a.value === b.value) && (a.counter === b.counter) && (a.completed === b.completed);
}

const render = function() {
    if (localStorage.data) {
        todoList.textContent = ''; // убирает то, что в этих полях уже БЫЛО записано перед тем, как вызвали функцию render()
        todoCompleted.textContent = '';
        let todoData = JSON.parse(localStorage.data);
        todoData.forEach(function(item) {
            const li = document.createElement('li');
            li.classList.add('todo-item');
            
            li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
                '<div class="todo-buttons">' + 
                    '<button class="todo-remove"></button>' + 
                    '<button class="todo-complete"></button>' + 
                '</div>';
            
            if (item.completed == true) { // расфасовка по категориям
                todoCompleted.append(li);
            }
            else {
                todoList.append(li);
            }
            const btnTodoComplete = li.querySelector('.todo-complete').addEventListener('click', function() {
                item.completed = !item.completed;
                localStorage.data = JSON.stringify(todoData);
                render();
            });
            const btnTodoRemove = li.querySelector('.todo-remove').addEventListener('click', function(){
                let index = 0;
                todoData.forEach(function(elem) {
                    if (compare(item, elem)) {
                        todoData.splice(index, 1);
                        localStorage.data = JSON.stringify(todoData);
                    };
                    index++;
                });
                render();
            });
        });
    }
}


todoControl.addEventListener('submit', function(event) {
    let counter = localStorage.counter ? +localStorage.counter : 0;
    event.preventDefault();
    let todoData = localStorage.data ? JSON.parse(localStorage.data) : [];
    if (headerInput.value !== '') {
        const newTodo = {
            id: counter,
            value: headerInput.value,
            completed: false
        }
        counter++;
        localStorage.counter = counter;
        todoData.push(newTodo);
        localStorage.data = JSON.stringify(todoData);
        headerInput.value = '';
        render();
    }
});
render();

// let arr = [
//     {
//         value: 1,
//         comment: 'smth'
//     },
//     {
//         value: 2,
//         comment: 'smth1'
//     },
//     {
//         value: 3,
//         comment: 'smth2'
//     },
//     {
//         value: 4,
//         comment: 'smth3'
//     }
// ];

// let item = {
//     value: 1,
//     comment: 'smth'
// };
// console.log(compare(item, arr[0]));