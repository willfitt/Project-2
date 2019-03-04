
let countId = 0;
let taskId = 0;
function count() {
    countId++;
    return countId;
}

function taskCount() {
    taskId++;
    return taskId;
}
function addItem() {
    let myVal = $(".myInput").val();
    let listItems = $(".myList").children();
    let listArray = [];
    if(myVal != ""){
        count();
        taskCount();
        console.log(countId);
        $(".myList").append(
            "<div class='itemContainer'>" +
            "<li class='list-group-item my-item' id='count"+countId+"'>"+ "<div contenteditable='true'>" + myVal + "</div>" +
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
    $("<div><i class='far fa-circle'></i><span>     </span><span contenteditable='true' onkeyup='leaveBox()' placeholder='...add Task'>...add task</span></div>").appendTo($("#task" + id));
}

function deleteItem(element, id) {
    $("#count" + id).fadeOut("medium", function(){
        $("#count" + id).remove();});
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