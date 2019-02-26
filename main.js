
// let myrows = document.getElementsByClassName("row");
// // myrows.style.fontSize = "24px";
// for(var i = 0; i < myrows.length; i++){
//     myrows[i].style.fontSize = "24px"
// }
//the block above is fixed with the jquery below

//below stuff should be helpful for the project?
//the row is creates font-size is smaller because the line performing that action has already been calledd. move line 19 below the append to fix this.
// $(function(){
//     $(".list").append("<div class='row'>Learn JQuery</div>");
// });

function addItem() {
    let myVal = $(".myInput").val();
    let listItems = $(".list").children();
    if(myVal != ""){

        $(".list").append("<div class='row'>"+
            " <i onclick='deleteItem(this)' class='fas fa-trash'></i>" +
            "<span contenteditable='true'>" + myVal +"</span>"+
            //demonstrating adding a class, not important for project necessarily
            // "<button onclick='gogreen(this)'>highlight</button>"+
            "</div>");
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

function gogreen(element){
    //no . before active, not sure why
    $(element).parent().addClass("active");
    $(element).parent().find('.icon').remove();
}