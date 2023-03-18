
    export let todos;
    if(localStorage.getItem("todos") === null){
        todos = []
        localStorage.setItem("todos", [])
    }else{
        try {
            todos = JSON.parse(localStorage.getItem("todos"));
        } catch (error) {
            todos = localStorage.getItem("todos")
        }
    }

