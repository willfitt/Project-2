
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
    return JSON.parse(items);
}

function renderItems() {
    console.log(itemArray);

    for (let i = 0; i < itemArray.length; i++) {
        
        let item = itemArray[i];
        if(item.complete){
            $(".completedList").append(
                "<div class='itemContainer' id='count"+item.countId+"'>" +
                "<li class='list-group-item my-item'>"+ "<div class='no-break' contenteditable='true' onkeyup='checkKeyEditTask(event, this, " + item.countId + ")'>" + item.myVal + "</div>" +
                "</li><div class='myTaskList' id='task"+item.taskId+"'></div></div>");
                for(let l = 0; l < item.subTasks.length; l++) {
    
                    let subTask = item.subTasks[l];
                    $("#task" + item.taskId).append(
                        "<ul class='taskItemBox' id='taskItem" + subTask.taskItemId + "'><li class='taskButton' >" +
                        "</li><input value='"+ subTask.value +"' class='form-control' placeholder='...add Task' type='text' contenteditable='true' onkeyup='checkKeySaveTask(event, this, " + item.taskId + ", " + subTask.taskItemId + ")'>" +
                        "<button class='btn btn-danger btn-sm taskDeleteButton' onclick='deleteTask(this, " + subTask.taskItemId + ")'>Delete</button></ul>");    
                }            
        }
        
        else{

        $(".myList").append(
            "<div class='itemContainer' id='count"+ item.countId +"'>" +
            "<li class='list-group-item my-item'>"+ "<div class='no-break' contenteditable='true' onkeyup='checkKeyEditTask(event, this, " + item.countId + ")'>" + item.myVal + "</div>" +
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
                    "<ul class='taskItemBox' id='taskItem" + subTask.taskItemId + "'><li class='taskButton'>" +
                    "</li><input value='"+ subTask.value +"' class='form-control' placeholder='...add Task' type='text' contenteditable='true' onkeyup='checkKeySaveTask(event, this, " + item.taskId + ", " + subTask.taskItemId + ")'>" +
                    "<button class='btn btn-danger btn-sm taskDeleteButton' onclick='deleteTask(this, " + subTask.taskItemId + ")'>Delete</button></ul>");

            }
    }}    
}
renderItems();

function addItem() {

    let myVal = $(".myInput").val();
    if(myVal != ""){
        count();
        taskListCount(); 
        $(".myList").append(
            "<div class='itemContainer' id='count"+countId+"'>" +
            "<li class='list-group-item my-item'>"+ "<div class='no-break' contenteditable='true' onkeyup='checkKeyEditTask(event, this, " + countId +")'>" + myVal + "</div>" +
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
        let taskStorageObject = {
            taskId: taskId,
            countId: countId,
            myVal: myVal,
            complete: false,
            subTasks: []
        };
        itemArray.push(taskStorageObject);
        saveToLocalStorage()
    }
    $(".myInput").focus();
}

function addTask(element, taskId, counterId) {
    taskItemCount();
    $("#task" + taskId).append("<ul class='taskItemBox' id='taskItem"+ taskItemId +"'><li class='taskButton'></li><input class='form-control' placeholder='...add Task' type='text' contenteditable='true' onkeyup='checkKeySaveTask(event, this, " + taskId + ", " + taskItemId + ")'><button class='btn btn-danger btn-sm taskDeleteButton' onclick='deleteTask(this, " + taskItemId + ")'>Delete</button></ul>");
    createItemTask(taskItemId, counterId);
}

function checkKeyAddItem(event) {    
    if(event.which == 13) addItem()    
}

function checkKeyEditTask(event, task, id) {
    let myVal = $(task).text()    
    if(event.which == 13) {
        editItem(myVal, id);
        $(task).blur()
    }
}

function checkKeySaveTask(event, task, id, taskId) {
    let myTaskVal = $(task).val();
    console.log(myTaskVal)
    if(event.which == 13) {     
        saveItemTask(myTaskVal, id, taskId);
        $(task).blur()
    }
}

function saveToLocalStorage() {
    localStorage.setItem('itemArray', JSON.stringify(itemArray));
}

function editItem(myVal, id) {   
    itemArray.forEach((item, index) => {        
        if (item.taskId == id) {
            itemArray[index].myVal = myVal;              
        }
    });
    saveToLocalStorage()
}

function saveItemTask(myTaskVal, id, taskId) {
    console.log(myTaskVal, id, taskId)
    itemArray.forEach((item, itemIndex) => {     
        console.log(id)   
        if (item.taskId == id) {
           const parentTask = itemArray[itemIndex]
           const subTasks = parentTask.subTasks;
        
            subTasks.forEach((taskItem, taskIndex) => {               
                if (taskItem.taskItemId == taskId) {                   
                  parentTask.subTasks[taskIndex].value = myTaskVal;              
                }
                else
                {
                    console.log("no match")
                }
            });            
        }
    });
    saveToLocalStorage()    
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
    console.log(taskStorageObject);
    console.log(itemArray);
    saveToLocalStorage()
}

function deleteItem(element, id) {
    $("#count" + id).fadeOut("medium", function() {
        $("#count" + id).empty();});
        console.log("id=", id);
        console.log(itemArray)
    for (let i = 0; i < itemArray.length; i++) {       
        if (itemArray[i].countId == id) {
            console.log("logging2", i);
            itemArray.splice(i, 1);      
            break;          
        }
    };
    saveToLocalStorage()
    console.log(itemArray)

 }

 function findParentItemByChildId(id) {
    return itemArray.find(function(item) {
        return item.subTasks.find(function(childItem) {
            return childItem.taskItemId == id; 
        });
    }); 
 }

function deleteTask(element, id) {
    $("#taskItem" + id).fadeOut("medium", function(){
        $("#taskItem" + id).remove();});

    let parentItem = findParentItemByChildId(id);
    for (let i = 0; i < parentItem.subTasks.length; i++) {       
        if (parentItem.subTasks[i].taskItemId == id) {
            console.log("childIndex", i);
            parentItem.subTasks.splice(i, 1);      
            break;          
        }
    };

    saveToLocalStorage()       
}

function completeItem(element, id) {
    $(element).parent().parent().remove(); 
    $("#count" + id).fadeOut("medium", function () {
        $(".completedList").append($("#count" + id));
        $("#count" + id).fadeIn("medium", function (){});
    });
    updateItemComplete(id)    
      
}

function updateItemComplete(id) {
    itemArray.forEach((item, index) => {        
        if (item.taskId == id) {
            itemArray[index].complete = true;              
        }
    });
    saveToLocalStorage()
}

function updateItemValue(id, myVal) {
    itemArray.forEach((item, index) => {        
        if (item.taskId == id) {
            itemArray[index].myVal = myVal;              
        }
    });
    saveToLocalStorage()
}

function deleteAllItems() {
    let check = confirm("Are you sure you want to delete your To Do items?");
    if (check === true) {
        $(".myList").empty();        
        itemArray = itemArray.filter(item => item.complete == true)      
        saveToLocalStorage();
        localStorage.setItem("countId", 0);
        localStorage.setItem("taskId", 0);
        localStorage.setItem("taskItemId", 0);

    } 
}

function deleteAllCompletedItems() {
    let check = confirm("Are you sure you want to delete your Completed items?");
    if (check === true) {
        $(".completedList").empty();
        itemArray = itemArray.filter(item => item.complete == false)      
        saveToLocalStorage();
    } 
}

function testfunc() {
    console.log('something')
}

//stack overflow
$(".no-break").keypress(function(e){ return e.which != 13; });