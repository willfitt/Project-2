
//below stuff should be helpful for the project?
//the row is creates font-size is smaller because the line performing that action has already been calledd. move line 19 below the append to fix this.
// $(function(){
//     $(".list").append("<div class='row'>Learn JQuery</div>");
// });

function addItem() {
    let myVal = $(".myInput").val();
    let listItems = $(".myList").children();
    if(myVal != ""){

        $(".myList").append(
            "<li  class='list-group-item' >"+ "<span contenteditable='true'>" + myVal + "</span>" +
            "<button class='btn btn-dark float-right' type='button' onclick='deleteItem(this)'>Delete Item</button>" +
            "</li>");
        $(".myInput").val("");
        console.log(listItems);
        $(".row:even").css("background-color", "#dadfea");
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
    //attempt to fix colors getting off, didnt work
    $(".row:even").css("background-color", "#dadfea");


}


function completeItem() {
//code for marking an item complete
}
