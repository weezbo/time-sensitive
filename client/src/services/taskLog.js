import http from "../http.common";

class TaskLogDataService {
    getAll() {
        return http.get("/task_logs");
    }

    get(id) {
        return http.get(`/task_logs/${id}`);
    }

    create(data) {
        return http.post("task_logs", data);
    }
}

export default new TaskLogDataService();