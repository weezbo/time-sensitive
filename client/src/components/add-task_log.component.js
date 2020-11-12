import React, { Component } from "react";
import TaskLogDataService from "../services/task_log.service";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


export default class AddTaskLog extends Component {
    constructor(props) {
        super(props);
        this.saveTaskLog = this.saveTaskLog.bind(this);
        this.newTaskLog = this.newTaskLog.bind(this);
        this.onChangeTask = this.onChangeTask.bind(this);
        // this.onChangeStartTime = this.onChangeStartTime.bind(this);
        // this.onChangeEndTime = this.onChangeEndTime.bind(this);

        this.state = {
            id: null,
            user_id: 1,
            task_id: 1,
            start_time: null,
            end_time: null
        };
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
            user_id: this.state.user_id,
            task_id: this.state.task_id,
            start_time: this.state.start_time,
            end_time: this.state.end_time
        };

        TaskLogDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    user_id: response.data.user_id,
                    task_id: response.data.task_id,
                    start_time: response.data.start_time,
                    end_time: response.data.end_time

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
            user_id: this.state.user_id,
            task_id: null,
            start_time: null,
            end_time: null,

            submitted: false
        });
    }

    render() {
        return (
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
                            <label htmlFor="task">Task</label>
                            <select value={this.state.value} onChange={this.onChangeTask} name="task" id="task" className="form-control">
                                <option value="1">Discovery</option>
                                <option value="2">Coding</option>
                                <option value="3">Debugging</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <label htmlFor="start_time">Start Time</label>
                                <TimePicker name="start_time" onChange={this.onChangeStartTime} value={this.state.time}/>
                                <label htmlFor="end_time">End Time</label>
                                <TimePicker name="end_time" onChange={this.onChangeEndTime} value={this.state.time} />
                            </MuiPickersUtilsProvider>
                        </div>

                        <button onClick={this.saveTaskLog} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}