import ToDoList from './todolist.js';
import ToDoItem from './todoitem.js';

const toDoList = new ToDoList();

document.addEventListener('readystatechange', (event) => {
  if(event.target.readyState === 'complete'){
    initApp();
  }
});

function initApp() {
  const itemEntryForm = document.getElementById('itemEntryForm');
  itemEntryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    processSubmission();
  });

  const clearItems = document.getElementById('clearItems');
  clearItems.addEventListener('click', (event) => {
    const list = toDoList.getList();
    if(list.length){
      const confirmed = confirm('Are you sure you want to clear the list?');
      if(confirmed){
        toDoList.clearList();
        updatePersistentData(toDoList.getList());
        refreshThePage();
      }
    }
  })

  loadListObject();
  refreshThePage();
}

function loadListObject() {
  const storedList = localStorage.getItem('myToDoList');
  if(typeof storedList !== 'string') return;
  const parsedList = JSON.parse(storedList);
  parsedList.forEach(itemObject => {
    const newToDoItem = createNewItem(itemObject._id, itemObject._item);
    toDoList.addItemToList(newToDoItem);
  })
}

function refreshThePage() {
  clearListDisplay();
  renderList();
  clearItemEntryField();
  setFocusOnItemEntry();

}

function clearListDisplay () {
  const parentElement = document.getElementById('listItems');
  deleteContents(parentElement);
}

function deleteContents(parentElement) {
  let child = parentElement.lastElementChild;
  while(child){
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

function renderList()  {
  const list = toDoList.getList();
  list.forEach(item => {
    buildListItem(item);
  });
};

function buildListItem(item) {
  const div = document.createElement('div');
  div.className = 'item';
  const check = document.createElement('input');
  check.type = 'checkbox';
  check.id = item.getId();
  check.tabIndex = 0;
  addClickListenerToCheckbox(check);
  const label = document.createElement('label');
  label.htmlFor = item.getId();
  label.textContent = item.getItem();
  div.appendChild(check);
  div.appendChild(label);
  const container = document.getElementById('listItems');
  container.appendChild(div);
};

function addClickListenerToCheckbox (checkbox) {
  checkbox.addEventListener('click', (event) => {
    toDoList.removeItemFromList(checkbox.id);

    updatePersistentData(toDoList.getList());

    setTimeout(() => {
      refreshThePage();
    }, 1000);
  });
};

function updatePersistentData(listArray) {
  localStorage.setItem('myToDoList', JSON.stringify(listArray));
}

function clearItemEntryField()  {
  document.getElementById('newItem').value = '';
};

function setFocusOnItemEntry() {
  document.getElementById('newItem').focus();
};

function processSubmission()  {
  const newEntryText = getNewEntry();
  if (!newEntryText.length) return;

  const nextItemId = calcNextItemId();
  const toDoItem = createNewItem(nextItemId, newEntryText);
  toDoList.addItemToList(toDoItem);

  updatePersistentData(toDoList.getList());

  refreshThePage();
};

function getNewEntry() {
  return document.getElementById('newItem').value.trim();
}

function calcNextItemId() {
  let nextItemId = 1;
  const list = toDoList.getList();
  if(list.length > 0){
    nextItemId = list[list.length -1].getId() + 1;
  }
  return nextItemId;
}

function createNewItem(itemId, itemText) {
  const toDo = new ToDoItem();
  toDo.setId(itemId);
  toDo.setItem(itemText);
  return toDo;
}