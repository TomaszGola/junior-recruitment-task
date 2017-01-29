// zmienne odwołujące się do klas w index.html
const addToDos = document.querySelector('.addToDos');
const toDosList = document.querySelector('.toDosList');


// zmienna zawierającą zadania do zrobienia i zamiana na obiekty lub, gdy nie ma żadnego zadania, to na tablicę
const toDos = JSON.parse(localStorage.getItem('toDos')) || [];

// funkcja dodawania zadań do listy zadań
function addToDo(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=toDoThing]')).value;
  const toDo = {
    text: text,
    done: false
  };

  toDos.push(toDo);
  makeList(toDos, toDosList);
  //przekazanie listy do local storage i zamiana na ciąg znaków
  localStorage.setItem('toDos', JSON.stringify(toDos));
  this.reset();
}

// funkcja służąca do tworzenia elementów html, które są wyświetlane jako kolejene pozycje z listy do wykonania.
function makeList(thingsToDos = [], thingsToDoList) {
  thingsToDoList.innerHTML = thingsToDos.map((thingToDo, i) => {
    return `
        <li
        ${thingToDo.done ? 'class="Done"' : ''}
        >
          
          <input 
          type="checkbox" 
          data-index=${i} 
          id="toDo${i}" 
          ${thingToDo.done ? 'checked' : ''}
          />
          
          <label 
          for="toDo${i}"
          >
          ${thingToDo.text}
          </label>
          
          <button 
          type="submit" 
          id="${i}" 
          class="removeToDos" 
          onclick="removeToDo(id)">
          <img src="../assets/trash.png" alt="">
          </button>
        </li>
      `;
  }).join('');
}

// funkcja służącą do usuwania elementów z listy zadań do wykonania i odświeżania widoku.
function removeToDo(id) {
  toDos.splice(id, 1);
  makeList(toDos, toDosList);
  localStorage.setItem('toDos', JSON.stringify(toDos));
}

// funkcja służąca do zaznaczania zadań wykonanych
function toggleDone(e) {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  toDos[index].done = !toDos[index].done;
  localStorage.setItem('toDos', JSON.stringify(toDos));
  makeList(toDos, toDosList);
}

// nasłuchiwacze na akcje
addToDos.addEventListener('submit', addToDo);
toDosList.addEventListener('click', toggleDone);


// Pierwsze renderowanie listy po przeładowaniu.
makeList(toDos, toDosList);