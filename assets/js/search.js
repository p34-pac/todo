import { showTodo} from "./index.js";
let todo;
try {
    todo = JSON.parse(localStorage.getItem("todos"))
} catch (error) {
    
}


export function search(e){
    document.querySelector('.main_route').innerHTML = '';
    if(e.target.value != ''){
        todo.forEach(item => {
            let titles = item.title;
            let title = titles.toLowerCase()
            if(title.indexOf(e.target.value) > -1){
                if(document.querySelector('.notFound')){
                    // showNotFound(e, 0)
                }
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
            }else if(title.indexOf(e.target.value) == -1){
                // showNotFound(e, 1)
            }
        });
    }else if(e.target.value == ''){
        showTodo()
    }
}
// document.addEventListener('click', move)
// function move(){
//     if(document.activeElement.id == 'searchbar'){
//         let searchbar = document.getElementById('searchbar')
//             if(searchbar.value == ''){
//                 showTodo()
//             }
            
//         }
    
// }
let searchbar = document.getElementById('searchbar')
searchbar.click((e)=>{
})





function showNotFound(e, go){
    if(go == 1){
        let div = document.createElement('div');
        div.className = 'notFound';
        div.innerHTML = `
        <b>"${e.target.value}" Does not exists</b>
        `;
        document.querySelector('.main_route').appendChild(div)
    }else{
        document.querySelector('.notFound').remove()
    }
}