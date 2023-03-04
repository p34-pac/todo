import { blur, openCardPopup } from "./open.card.js";

let app = document.getElementById('app');
let menu_tray = document.querySelector('.menu_tray');
app.addEventListener('click', clickedSomeWhereOnApp);

export function clickedSomeWhereOnApp(e){
    let target;
    if(e.target.classList.contains('open_menu')){
        target = e.target;
    }else if(e.target.parentElement.classList.contains('open_menu')){
        target = e.target.parentElement;
    }else if(e.target.classList.contains('close')){
        target = e.target;
    }else if(e.target.parentElement.classList.contains('close')){
        target = e.target.parentElement;
    }

    if(e.target.classList.contains('little')|| e.target.parentElement.classList.contains('little') || e.target.classList.contains('time') || e.target.parentElement.classList.contains('time') || e.target.classList.contains('tdt')){
        let idloc = e.target.parentElement.classList[1];
        let idspl = idloc.split('-');
        const id = idspl[1];
        openCardPopup(id)
        
    }else if(e.target.classList.contains('tdc')|| e.target.parentElement.classList.contains('tdc')){
        semiMenu()
    }

    action(target);
}

function action(menu){
    try {
        if(menu.classList.contains('open_menu')){
            open_menu();
        }else if(menu.classList.contains('close')){
            close_menu();
        }
    } catch (error) {
    }

}

function open_menu(){
    menu_tray.style.display = 'block';
    menu_tray.style.animation = 'open_menu_tray 0.5s linear';
    blur(1)
    document.getElementById('searchbar').style.display = 'none'
}
function close_menu(){
    menu_tray.style.animation = 'close_menu_tray 0.5s linear';
    blur(0)
    document.getElementById('searchbar').style.display = 'block'

    setTimeout(()=>{
        menu_tray.style.display = 'none';
    },500)
}

// --------------------------semi_menu--------------------

document.querySelector('.main_action').addEventListener('mouseover', semiMenu)
semiMenu()
function semiMenu(){
    document.querySelector('.main_action').style.opacity = '100%'
    setTimeout(()=>{
        document.querySelector('.main_action').style.opacity = '20%'
    }, 5000)
}

