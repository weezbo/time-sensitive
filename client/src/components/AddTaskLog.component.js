import React, { Component } from "react";
import TaskLogDataService from "../services/taskLog";
import TaskDataService from "../services/task.service";
import TaskPicker from "./TaskPicker";
import AuthService from "../services/auth.service";

export default class AddTaskLog extends Component {
    constructor(props) {
        super(props);
        this.onChangeTask = this.onChangeTask.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        this.saveTaskLog = this.saveTaskLog.bind(this);
        this.newTaskLog = this.newTaskLog.bind(this);

        this.state = {
            id: null,
            user_id: 1,
            task_id: "",
            start_time: "",
            end_time: "",
            tasks: [],
            logged_in_user: null,

            submitted: false
        };
    }

    componentDidMount() {
        let initialTasks = [];
        TaskDataService.getAll()
            .then(response => {
                initialTasks = response.data.map((task) => {
                    return {
                        id: task.id,
                        description: task.description
                    }
                })
                this.setState({tasks: initialTasks});
            })
        const user = AuthService.getCurrentUser();
        if(user) {
            console.log(user)
            this.setState({
                user_id: user.id,
                logged_in_user: user.id
            })
        }
    }

    onChangeTask(e) {
        this.setState({
            task_id: e.target.value
        });
    }

    onChangeStartTime(e) {
        this.setState({
            start_time: e.target.value
        });
    }

    onChangeEndTime(e) {
        this.setState({
            end_time: e.target.value
        });
    }

    saveTaskLog() {
        const data = {
            task_id: this.state.task_id,
            user_id: this.state.user_id,
            start_time: this.state.start_time,
            end_time: this.state.end_time
        };

        TaskLogDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    task_id: response.data.task_id,
                    user_id: response.data.user_id,
                    start_time: response.data.start_time,
                    end_time: response.data.end_time,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newTaskLog() {
        this.setState({
            id: null,
            task_id: "",
            user_id: this.state.logged_in_user,
            start_time: "",
            end_time: "",

            submitted: false
        });
    }

    render() {
        return (
            <div>
            {!this.state.logged_in_user ? (
                <div className = "login-please">
                    <h2>Please login for access (link at top)</h2>
                </div>
            ) : (

            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newTaskLog}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="task_id">Task</label>
                            <TaskPicker tasks={this.state.tasks} value={this.state.task_id} onChange={this.onChangeTask}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="start_time">Start Time</label>
                            <input
                                type="text"
                                className="form-control"
                                id="start_time"
                                required
                                value={this.state.start_time}
                                onChange={this.onChangeStartTime}
                                name="start_time"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="end_time">End Time</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.end_time}
                                onChange={this.onChangeEndTime}
                                name="end_time"
                            />
                        </div>

                        <button onClick={this.saveTaskLog} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
            )}
            </div>
        );
    }
}