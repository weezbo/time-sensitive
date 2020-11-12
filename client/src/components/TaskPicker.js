import React, { Component } from 'react';

class TaskPicker extends Component {

    render() {
        const tasks = this.props.tasks;
        const optionItems = tasks.map( task => {
            return <option key={task.id} value={task.id}>{task.description}</option>
        })
        return ( <div>
            <select value={this.props.value} onChange={this.props.onChange}>
                {optionItems}
            </select>
        </div>);
    }
}

export default TaskPicker