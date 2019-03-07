

let countId = localStorage.getItem("countId") || 0;
let taskId = localStorage.getItem("taskId") || 0;
let taskItemId = localStorage.getItem("taskItemId") || 0;
let itemArray = retrieveItems() || [];


function count() {
    countId++;
    localStorage.setItem("countId", countId);
    return countId;
    console.log("logging")
}

function taskListCount() {
    taskId++;
    localStorage.setItem("taskId", taskId);
    return taskId;
}

function taskItemCount() {
    taskItemId++;
    localStorage.setItem("taskItemId", taskItemId);
    return taskItemId;
}

function retrieveItems() {
    const items = localStorage.getItem('itemArray');
    console.log(items);
    return JSON.parse(items);
}

function renderItems() {
    for (let i = 0; i < itemArray.length; i++) {

        let item = itemArray[i];
        $(".myList").append(
            "<div class='itemContainer' id='count"+item.countId+"'>" +
            "<li class='list-group-item my-item'>"+ "<div contenteditable='true' onkeyup='count()'>" + item.myVal + "</div>" +
            "<div class='dropdown flex-nowrap'>" +
            "<button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenu2' data-toggle='dropdown' aria-haspopup='true' aria-expanded=false'>" +
            "<i class='fas fa-cog'></i>" + " " + "</button>" +
            "<div class='dropdown-menu' aria-labelledby=dropdownMenu2'>" +
            "<button class='btn btn-secondary dropdown-item' type='button' onclick='addTask(this, " + item.taskId + ", " + item.countId +")'>Add Task</button>" +
            "<button class='btn btn-warning dropdown-item' type='button' onclick='completeItem(this, " + item.countId + ")'>Complete</button>" +
            "<button class='btn btn-secondary dropdown-item' type='button' onclick='deleteItem(this, " + item.countId + ")'>Delete</button>" +
            "</div>" + "</div>" + "</li>" +
            "<div class='myTaskList' id='task"+item.taskId+"'></div>" +
            "</div>");
            for(let l = 0; l < item.subTasks.length; l++) {

                let subTask = item.subTasks[l];
                $("#task" + item.taskId).append(
                    "<ul class='taskItemBox' id='taskItem" + subTask.taskItemId + "'><li class='taskButton' onkeyup='saveItemTask(" + subTask.taskId + ", " + subTask.counterId +")'>" +
                    "</li><input class='form-control' placeholder='...add Task' type='text' contenteditable='true' >" +
                    "<button class='btn btn-danger btn-sm taskDeleteButton' onclick='deleteTask(this, " + subTask.taskItemId + ")'>Delete</button></ul>");

            }
    }
    
}

renderItems();

function addItem() {

    let myVal = $(".myInput").val();
    if(myVal != ""){
        count();
        taskListCount();
        console.log(countId);
        $(".myList").append(
            "<div class='itemContainer' id='count"+countId+"'>" +
            "<li class='list-group-item my-item'>"+ "<div contenteditable='true'>" + myVal + "</div>" +
            "<div class='dropdown flex-nowrap'>" +
            "<button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenu2' data-toggle='dropdown' aria-haspopup='true' aria-expanded=false'>" +
            "<i class='fas fa-cog'></i>" + " " + "</button>" +
            "<div class='dropdown-menu' aria-labelledby=dropdownMenu2'>" +
            "<button class='btn btn-secondary dropdown-item' type='button' onclick='addTask(this, " + taskId + ", " + countId +")'>Add Task</button>" +
            "<button class='btn btn-warning dropdown-item' type='button' onclick='completeItem(this, " + countId + ")'>Complete</button>" +
            "<button class='btn btn-secondary dropdown-item' type='button' onclick='deleteItem(this, " + countId + ")'>Delete</button>" +
            "</div>" + "</div>" + "</li>" +
            "<div class='myTaskList' id='task"+taskId+"'></div>" +
            "</div>");
        $(".myInput").val("");
        $(".myInput").val("");
        let taskStorageObject = {
            taskId: taskId,
            countId: countId,
            myVal: myVal,
            subTasks: []
        };
        itemArray.push(taskStorageObject);
        localStorage.setItem('itemArray', JSON.stringify(itemArray));
        console.log(itemArray)
    }
    $(".myInput").focus();
}

function checkKey(event){
    switch(event.which){
        case 13:
            addItem();
            break;
    }
}

function renderTask() {

}

function addTask(element, id, counterId) {

    taskItemCount();
    $("#task" + id).append("<ul class='taskItemBox' id='taskItem"+ taskItemId +"'><li class='taskButton' onkeyup='saveItemTask(" + taskId + ", " + counterId +")'></li><input class='form-control' placeholder='...add Task' type='text' contenteditable='true' ><button class='btn btn-danger btn-sm taskDeleteButton' onclick='deleteTask(this, " + taskItemId + ")'>Delete</button></ul>");
    createItemTask(taskItemId, counterId);
}

function createItemTask(taskItemId, counterId) {
    
    let taskStorageObject;
    for (i = 0; i < itemArray.length; i++) {
       let currentItem = itemArray[i];
       if (currentItem.countId === counterId) {
        taskStorageObject = currentItem;
            break;
       }
    }

    console.log(taskStorageObject);

    let taskToSave = {
        taskItemId: taskItemId,
        value: "",  
    };
  
    taskStorageObject.subTasks.push(taskToSave);
    console.log(itemArray);
    localStorage.setItem('itemArray', JSON.stringify(itemArray))
}

function deleteItem(element, id) {
    $("#count" + id).fadeOut("medium", function(){
        $("#count" + id).empty();});
    }

function deleteTask(element, id) {
    $("#taskItem" + id).fadeOut("medium", function(){
        $("#taskItem" + id).remove();});
}

function completeItem(element, id) {
    $("#count" + id).fadeOut("medium", function () {
        $(".completedList").append($("#count" + id));
        $("#count" + id).fadeIn("medium", function (){});
    });
}

function deleteAllItems() {
    let check = confirm("Are you sure you want to delete your To Do items?");
    if (check === true) {
        $(".myList").empty();
    } else {

    }
}

function deleteAllCompletedItems() {
    let check = confirm("Are you sure you want to delete your Completed items?");
    if (check === true) {
        $(".completedList").empty();
    } else {

    }
}