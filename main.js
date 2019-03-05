
let countId = 0;
let taskId = 0;
let taskItemId = 0;
function count() {
    countId++;
    return countId;
}

function taskListCount() {
    taskId++;
    return taskId;
}

function taskItemCount() {
    taskItemId++;
    return taskItemId;
}

function addItem() {
    let myVal = $(".myInput").val();
    let listItems = $(".myList").children();
    let listArray = [];
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
            "<button class='btn btn-warning dropdown-item' type='button' onclick='completeItem(event, " + countId + ")'>Complete</button>" +
            "<button class='btn btn-secondary dropdown-item' type='button' onclick='deleteItem(this, " + countId + ")'>Delete</button>" +
            "</div>" + "</div>" + "</li>" +
            "<div class='myTaskList' id='task"+taskId+"'></div>" +
            "</div>");
        $(".myInput").val("");
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

function addTask(element, id) {
    // let myTaskVal = $(".myTaskInput").val();
    taskItemCount();
    $("<div  id='taskItem"+taskItemId+"' ><i class='far fa-circle'></i><span>     </span><span contenteditable='true' onkeyup='leaveBox()' placeholder='...add Task'>...add task</span><button class=' btn btn-danger' onclick='deleteTask(this, " + taskItemId + ")'>Delete</button></div>").appendTo($("#task" + id));
}

function deleteItem(element, id) {
    $("#count" + id).fadeOut("medium", function(){
        $("#count" + id).empty();});
}

function deleteTask(element, id) {
    $("#taskItem" + id).fadeOut("medium", function(){
        $("#taskItem" + id).remove();});
}

function completeItem(event, id) {
    $("#count" + id).fadeOut("medium", function(){
        $(".completedList").append($("#count" + id).valueOf($(".my-item")));
        $("#count" + id).remove();
    });
}

function deleteAllItems() {
    let check = confirm("Are you sure you want to delete your To Do items?");
    if (check === true) {
        $(".myList").empty();
    } else {

    }
}