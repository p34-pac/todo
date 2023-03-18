import { addNewTodo } from "./addNewTodo.js";
import { blur, removePopup } from "./open.card.js";
import { search } from "./search.js";
import { clickedSomeWhereOnApp } from "./toggle.menu.js";
let todo;
try {
    todo = JSON.parse(localStorage.getItem("todos"))
} catch (error) {
    
}if(!localStorage.getItem('todos')){
    localStorage.setItem('todos', [])
}
try {
    showTodo()
} catch (error) {
    
}
export function reloadId(){
    try {
        todo = JSON.parse(localStorage.getItem("todos"));
        let newid = -1;
        todo.forEach(i => {
                newid++;
                i.id = newid;
        });
        localStorage.setItem("todos", JSON.stringify(todo))
    } catch (error) {
        
    }
}


let app = document.getElementById('app');
app.addEventListener('click', clickedSomeWhereOnApp);
document.getElementById('searchbar').addEventListener('keyup', search)
document.querySelector('.openAddNewTodo').addEventListener('click', openAddNewTodo)
function openAddNewTodo(){
    try {
        removePopup()
    } catch (error) {
        
    }
    let main = document.getElementById('main');
    let popup = document.createElement('div');
    popup.className = 'todo_popup';
    popup.innerHTML =  `
    <div class="content pop">
        <b class="add_todo">Add Todo</b>
        <form>
            <div class="inputTitle">
                <label for="Title">Title</label>
                <input type="text" placeholder="Title" id="todoTitle">
            </div>
            <div class="textToDo">
                <label for="Todo">Todo</label>
                <textarea name="todoContent" rows="1" placeholder="Type ToDo here" id="todoContent"></textarea>
            </div>
        </form>
    </div>
    <div class="action">
        <button id="add" class="id">Add</button>
        <button id="closePopup">cancel</button>
    </div>
    `;
    main.appendChild(popup);
    document.getElementById('closePopup').addEventListener('click', removePopup);
    document.getElementById('add').addEventListener('click', addNewTodo)
    
    blur(1)
}
localStorage.setItem('todo', {})
export function showTodo(){
    blur(1)
    todo = JSON.parse(localStorage.getItem("todos"))
    document.querySelector('.main_route').innerHTML = ''
    setTimeout(blur(0), 500)
    todo.forEach(item => {
        document.querySelector('.main_route').innerHTML += `
            <div class="to_do_card for-${item.id}">
                <div class="content for-${item.id}">
                    <b class="todo_title tdt for-${item.id}">${item.title}</b>
                    <div class="little for-${item.id}">
                        <b>${item.content}</b>
                    </div>
                    <div class="time for-${item.id}">
                        <b>${item.date}</b>
                    </div>
                </div>
                <div class="action for-${item.id}">
                    <div class="menu_button tdc for-${item.id}">
                        <div class="menu_dash for-${item.id}"></div>
                        <div class="menu_dash for-${item.id}"></div>
                        <div class="menu_dash for-${item.id}"></div>
                    </div>
                </div>
            </div>
        `;
    });
    reloadId()
}


export function edit(e){
    let id = getid(e.target.className);
    let todo = JSON.parse(localStorage.getItem("todos"))
    todo.forEach((todos)=>{
        if(todos.id == id){
            try {
                removePopup()
            } catch (error) {
                
            }
            let main = document.getElementById('main');
            let popup = document.createElement('div');
            popup.className = 'todo_popup';
            popup.innerHTML =  `
            <div class="content pop">
                <b class="add_todo">Edit This Todo</b>
                <form>
                    <div class="inputTitle">
                        <label for="Title">Title</label>
                        <input type="text" placeholder="Title" id="todoTitle" value="${todos.title}">
                    </div>
                    <div class="textToDo">
                        <label for="Todo">Todo</label>
                        <textarea name="todoContent" rows="1" placeholder="Type ToDo here" id="todoContent">${todos.content}</textarea>
                    </div>
                </form>
            </div>
            <div class="action">
                <button id="save" class="id-${todos.id}">save</button>
                <button id="closePopup">cancel</button>
            </div>
            `;
            main.appendChild(popup);
            document.getElementById('closePopup').addEventListener('click', removePopup);
            document.getElementById('save').addEventListener('click', saving)
            blur(1)
            function saving(){
                let ret = document.getElementById('todoTitle').value;
                let rec = document.getElementById('todoContent').value;
                todos.content = rec;
                todos.title = ret;
                localStorage.setItem("todos", JSON.stringify(todo))
                showTodo()
                removePopup()
            }
        }
    })
    reloadId()
}
export function del(e){
    todo = JSON.parse(localStorage.getItem("todos"))
    blur(1)
    let main = document.getElementById('main');
    let id = getid(e.target.className);
    let popup = document.createElement('div');
    popup.className = 'todo_popup';
    popup.innerHTML =  `
    <div class="content pop">
        <b class="todo_title">says</b>
        <div class="text">are you sure you want to delete this?</div>
        
    </div>
    <div class="action">
        <button id="yes">yes</button>
        <button id="closePopup">close</button>
        
    </div>
    `;
    removePopup()
    blur(1)
    main.appendChild(popup);
    document.getElementById('yes').addEventListener('click', goOn)
    document.getElementById('closePopup').addEventListener('click', removePopup)
    function goOn(){
        todo.splice(id, 1)
        let newid = -1;
        todo.forEach(i => {
                newid++;
                i.id = newid;
        });
        localStorage.setItem("todos", JSON.stringify(todo))
        reloadId()
        showTodo()
        removePopup()
        blur(0)
    }
    
    
}

function getid(from){
    let whole = from.split('-');
    let id = whole[whole.length - 1]
    return id;
}