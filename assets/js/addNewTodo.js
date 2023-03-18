import { reloadId, showTodo} from "./index.js";
import { removePopup } from "./open.card.js";
let todo;
try {
    todo = JSON.parse(localStorage.getItem("todos"))
} catch (error) {
    
}export function addNewTodo(){
    let id;
    try {
        id = todo.length;
    } catch (error) {
        id = 0;
    }
    
    
    let titleText, contentText;
    titleText = document.getElementById('todoTitle').value,
    contentText = document.getElementById('todoContent').value;
    let alldate = new Date()
    let h = alldate.getHours();
    let m = alldate.getMinutes();
    let mon = alldate.getUTCMonth();
    let day = alldate.getDate();
    let year = alldate.getFullYear();
    let newTodo = {
        content: contentText,
        title: titleText,
        date: `${h}:${m} AM, ${day}-${mon}-${year}`,
        id
    }
    let todoo;
    if(localStorage.getItem("todos") === null || localStorage.getItem("todos") === ''){
        todoo = [];
        localStorage.setItem("todos", todoo)
        // todoo = JSON.parse(localStorage.getItem("todos"))
    }else{
        try {
            todoo = JSON.parse(localStorage.getItem("todos"))
        } catch (error) {
            
        }    
    }
    todoo.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todoo));
    setInterval(displayTodosAgain(), 500);
}

export function displayTodosAgain(){
    blur(1)
    reloadId();
    todo = JSON.parse(localStorage.getItem("todos"))
    document.querySelector('.main_route').innerHTML = '';
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
    document.getElementById('todoTitle').value = '';
    document.getElementById('todoContent').value = '';
    removePopup()
}