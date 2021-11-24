export default class ListTaskService {
    getListTaskAPI() {
        return axios({
            url: "https://6183cae791d76c00172d1b5b.mockapi.io/api/toDoList",
            method: "GET",
        });
    }
    deleteTaskAPI(id) {
        return axios({
            url: `https://6183cae791d76c00172d1b5b.mockapi.io/api/toDoList/${id}`,
            method: "DELETE",
        })
    }
    addTaskAPI(task) {
        return axios({
            url: "https://6183cae791d76c00172d1b5b.mockapi.io/api/toDoList",
            method: "POST",
            data: task,
        })
    }
    getTaskAPI(id){
        return axios ({
            url: `https://6183cae791d76c00172d1b5b.mockapi.io/api/toDoList/${id}`,
            method: "GET",
        });
    }
    updateTaskAPI(id, taskObj) {
        return axios({
            url: `https://6183cae791d76c00172d1b5b.mockapi.io/api/toDoList/${id}`,
            method: "PUT",
            data: taskObj,
        })
    }
}