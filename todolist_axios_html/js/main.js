import ListTaskService from "../js/getID-service.js";
import Tasks from "../js/Tasks.js";
const listTaskService = new ListTaskService();

const getEle = (id) => document.getElementById(id);
const getEleClass = (cla) => document.getElementsByClassName(cla);
/**
 * Lấy Data từ API
 */
const fetchData = () => {
  listTaskService.getListTaskAPI()
    .then((result) => {
      console.log(result.data);
      renderData(result.data);
    })
    .catch((error) => {
      console.log(error);
    })
}
fetchData();
/**
 * HIển thị Data
 */
const renderData = (arr) => {
  let listToDo = "";
  let listComplete = "";
  arr?.forEach((task) => {
    if (task.status == "todo") {
      listToDo += `
            <li>
            <span>${task.textTask}</span>
            <div class="buttons">
              <button class="remove" onclick="deleteTask(${task.id})">
                <i class="fa fa-trash-alt"></i>
              </button>
              <button class="edit" onclick="getTask(${task.id})">
                <i class="fa fa-edit"></i>
              </button>
              <button class="complete">
                <i class="far fa-check-circle"></i>
                <i class="fas fa-check-circle"></i>
              </button>
            </div>
          </li> `
    }
    if (task.status == "completed") {
      listComplete += `
            <li>
            <span>${task.textTask}</span>
            <div class="buttons">
              <button class="remove" onclick="deleteTask(${task.id})">
                <i class="fa fa-trash-alt"></i>
              </button>
              <button class="edit" onclick="getTask(${task.id})">
                <i class="fa fa-edit"></i>
              </button>
              <button class="complete">
                <i class="far fa-check-circle"></i>
                <i class="fas fa-check-circle"></i>
              </button>
            </div>
          </li>
          `
    }
  });
  getEle("todo").innerHTML = listToDo;
  getEle("completed").innerHTML = listComplete;
}

/**
 * Delete
 */

function deleteTask(id) {
  listTaskService.deleteTaskAPI(id)
    .then(() => {
      alert("delete success!");
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    });
}
window.deleteTask = deleteTask;

/**
 * Add Task
 */

function addTaks() {

  const textTask = getEle("newTask").value;

  const task = new Tasks("", textTask, "todo")
  listTaskService.addTaskAPI(task)
    .then(() => {
      alert("Add Success!")
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    });
}
window.addTaks = addTaks;


/**
 * Lấy Task bằng ID
 */
const getTask = (id, status) => {
  const buttonUpdate = `
    <input
          id="newTask"
          type="text"
          placeholder="Enter an activity..."
    />
    <button class="update" onclick="updateTask(${id},'${status}')">
        <i class="fa fa-check"></i>
    </button>
`;
  getEleClass("card__add")[0].innerHTML = buttonUpdate;
  listTaskService.getTaskAPI(id)
    .then((result) => {
      console.log(result);
      getEle("newTask").value = result.data.textTask;
      status = result.data.status;
      console.log(status)
    })
    .catch((error) => {
      alert(error);
    })
}
window.getTask = getTask;


/**
 * Update Task
 */
const updateTask = (id, status) => {
  const textTask = getEle("newTask").value;

  const task = new Tasks("", textTask, status)
  console.log(task);
  listTaskService.updateTaskAPI(id, task)
    .then((result) => {
      console.log(result);
      fetchData();
      alert("Update success!");
      // location.reload();
    })
    .catch((error) => {
      alert(error);
    });
}
window.updateTask = updateTask;