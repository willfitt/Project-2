

let countId = localStorage.getItem("countId") || 0;
let taskId = localStorage.getItem("taskId") || 0;
let taskItemId = localStorage.getItem("taskItemId") || 0;


function count() {
    countId++;
    localStorage.setItem("countId", countId);
    return countId;
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

function renderItems() {
    for (let i = 0; i < localStorage.length; i++) {
        addItem()
    }

}

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
            "<button class='btn btn-secondary dropdown-item' type='button' onclick='addTask(this, " + taskId + ")'>Add Task</button>" +
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
            taskItemId: taskItemId,
            myVal: myVal
        };
        localStorage.setItem(taskId, JSON.stringify(taskStorageObject));
        console.log((taskStorageObject))
    }
    $(".myInput").focus();
}

// function getTaskItems() {
//     const taskString = localStorage.getItem('taskId');
//     return JSON.parse(taskString);
// }

function checkKey(event){
    switch(event.which){
        case 13:
            addItem();
            break;
    }
}

function addTask(element, id) {

    taskItemCount();
    $("<ul class='taskItemBox' id='taskItem"+taskItemId+"'><li class='taskButton' onkeyup='leaveBox()' ></li><input class='form-control' placeholder='...add Task' type='text' contenteditable='true' ><button class='btn btn-danger btn-sm taskDeleteButton' onclick='deleteTask(this, " + taskItemId + ")'>Delete</button></ul>").appendTo($("#task" + id));
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
    $(".completedList").append($("#count" + id));
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