function addItem() {
    let myVal = $(".myInput").val();
    let listItems = $(".myList").children();
    if(myVal != ""){

        $(".myList").append(
            "<li  class='list-group-item my-item' >"+ "<div contenteditable='true'>" + myVal + "</div>" +
            "<div class='dropdown flex-nowrap'>" +
            "<button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenu2' data-toggle='dropdown' aria-haspopup='true' aria-expanded=false'>" +
            "<i class='fas fa-cog'></i>" + " " + "</button>" +
            "<div class='dropdown-menu' aria-labelledby=dropdownMenu2'>" +
            "<button class='btn btn-secondary dropdown-item' type='button' onclick='addTask(this)'>Add Task</button>" +
            "<button class='btn btn-warning dropdown-item' type='button' onclick='completeItem(this)'>Complete</button>" +
            "<button class='btn btn-secondary dropdown-item' type='button' onclick='deleteItem(this)'>Delete</button>" +
            "</div>" + "</div>" +
            "</li>");
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

//the element parameter is arbitrary, could be anything as long as its the same in both spots
function deleteItem(element) {
    $(element).parent().fadeOut("medium", function(){
        $(element).parent().remove();
    });
}


function completeItem(element, event) {
    console.log("completing");
    $(element).parent(list-group-item).fadeOut("medium", function(){
        $(element).parent(list-group-item).remove();

        $(".completedList").append($(event.target.innerHTML));
    //    fixthis!
    });
}

function deleteAllItems() {
    let check = confirm("Are you sure you want to delete your To Do items?");
    if (check === true) {
        $(".myList").empty();
    } else {

    }
}

function addTask(element) {

}

//FIX DROPDOWN BUTTON FUNCTIONS TO ACTUALLY WORK