import ToDoList from './todolist';
import ToDoItem from './todoitem';

const toDoList = new ToDoList();

//Launch app
document.addEventListener('readystatechange', (event) => {
  if(event.target.readyState === 'complete'){
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
  const parentElement = document.getElementById('listItems');
  deleteContents(parentElement);
}

const deleteContents = (parentElement) => {
  let child = parentElement.lastElementChild;
  while(child){
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

const renderList = () => {
  const list = toDoList.getList();
  list.forEach(item => {
    buildListItem(item);
  });
};

const buildListItem = (item) => {
  const div = document.createElement('div');
  div.className = 'item';
  const check = document.createElement('input');
  check.type = 'checkbox';
  check.id = item.getId();
  check.tabIndex = 0;
  // add click listener to checkbox
  const label = document.createElement('label');
  label.htmlFor = item.getId();
  label.textContent = item.getItem();
  div.appendChild(check);
  div.appendChild(label);
  const container = document.getElementById('listItems');
  container.appendChild(div);
}