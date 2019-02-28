function addItem() {
    let myVal = $(".myInput").val();
    let listItems = $(".myList").children();
    if(myVal != ""){

        $(".myList").append(
            "<li  class='list-group-item my-item' >"+ "<span contenteditable='true'>" + myVal + "</span>" +
            "<button class='btn btn-secondary float-right' type='button' onclick='deleteItem(this)'>Delete</button>" +
            "<button class='btn btn-warning float-right' type='button' onclick='completeItem(this)'>Completed</button>" +
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


function completeItem(element) {
    console.log("completing");
    $(element).parent().fadeOut("medium", function(){
        $(element).parent().remove();

        $('.completedList').append($(element.outerHTML));
    });
}

function deleteAllItems() {
    $(".myList").empty();
}

