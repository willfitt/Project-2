function addItem() {
    let myVal = $(".myInput").val();
    let listItems = $(".myList").children();
    if(myVal != ""){

        $(".myList").append(
            "<li  class='list-group-item' >"+ "<span contenteditable='true'>" + myVal + "</span>" +
            "<button class='btn btn-outline-secondary float-right' type='button' onclick='deleteItem(this)'>Delete Item</button>" +
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
    console.log("deleting");
    $(element).parent().fadeOut("medium", function(){
        $(element).parent().remove();
    });



}


function completeItem() {
//code for marking an item complete
}
