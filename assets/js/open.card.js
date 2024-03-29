import { del, edit} from "./index.js";
import { clickedSomeWhereOnApp, close_menu, menu_opened } from "./toggle.menu.js";
let todo;
try {
    todo = JSON.parse(localStorage.getItem("todos"))
} catch (error) {
    
}

let main = document.getElementById('main');
let app = document.getElementById('app');

export function openCardPopup(id){
    showPopUp(id)
}

function showPopUp(id){
    if(main.children.length>1){
        if(menu_opened == false){
            removePopup()
            pop(id)
            blur(1)
            app.removeEventListener('click', clickedSomeWhereOnApp);
            document.querySelector('.main_route').addEventListener('click', removePopup)

        }
    }else{
            if(menu_opened == false){
                pop(id)
                blur(1)
                app.removeEventListener('click', clickedSomeWhereOnApp);
                document.querySelector('.main_route').addEventListener('click', removePopup)
            }
    }
}

export function removePopup(){
    for (const key in main.children) {
        if (Object.hasOwnProperty.call(main.children, key)) {
            const element = main.children[key];
            if(element.classList.contains('todo_popup')){
                element.remove()
                blur(0)
                app.addEventListener('click', clickedSomeWhereOnApp);
            }
            
        }
    }
}

function pop(id){
    try {
        close_menu()
    } catch (error) {}
    todo = JSON.parse(localStorage.getItem("todos"))
    let popup = document.createElement('div');
    popup.className = 'todo_popup';
    todo.forEach(todo => {
        if(todo.id == id){
            popup.innerHTML =  `
            <div class="content pop">
                        <b class="todo_title">${todo.title}</b>
                        <div class="text">${todo.content}</div>
                        <div class="time">
                            <b>${todo.date}</b>
                        </div>
                    </div>
                    <div class="action">
                        <button id="edit" class="id-${todo.id}">Edit</button>
                        <button id="closePopup">close</button>
                        <button id="delete" class="id-${todo.id}">delete</button>
                    </div>
            `;
            main.appendChild(popup);
        }
    });
    try {
        document.getElementById('edit').addEventListener('click', edit)
        document.getElementById('delete').addEventListener('click', del)
        document.getElementById('closePopup').addEventListener('click', removePopup)
    } catch (error) {
        
    }
        
        
        
}

export function blur(decision){
    if(decision == 1){
        document.querySelector('.main_route').style.filter = 'blur(5px)';
        
    }else if(decision == 0){
        document.querySelector('.main_route').style.filter = 'blur(0px)';
        
    }
}

// delete todos[1]
