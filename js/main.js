import ToDoList from "./todolist";
import ToDoItem from "./todoitem";

const toDoList = new ToDoList();

//Launch app
document.addEventListener("readystatechange", (event) => {
  if(event.target.readyState === "complete"){
    initApp();
  }
});

const initApp = () => {
  //Add listeners

  //procedural: things to do when app loads
  //load list object
  //refresh page
  refreshThePage();
}

const refreshThePage = () => {
  clearListDisplay();

  //render the list
  // renderlist();

  //clear the item entry field
  // clearItemEntryField();

  //set the focus on the item entry field
  // setFocusOnItemEntry();

}

clearListDisplay = () => {
  const parentElement = document.getElementById("listItems");
  deleteContents(parentElement);
}

const deleteContents = (parentElement) => {
  let child = parentElement.lastElementChild;
  while(child){
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
}