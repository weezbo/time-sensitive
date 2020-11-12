import http from "../http.common";

class TaskDataService {
    getAll() {
        return http.get("/tasks");
    }
}

export default new TaskDataService();