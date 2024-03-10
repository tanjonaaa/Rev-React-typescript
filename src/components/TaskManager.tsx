import { ChangeEvent } from "react";
import "./TaskManager.css";
import { useTaskManager } from "../hooks/useTaskManager";

// TODO: create custom hook to manage task state
export const TaskManager = () => {

  const {    
    title,
    setTitle,
    completeTask,
    updateTask,
    addTask,
    handleSearch,
    filteredTasks} = useTaskManager();


  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input type="text" onChange={handleSearch} placeholder="Search Task" />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => {
            setTitle(ev.target.value);
          }}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateTask(task.id, { title: e.target.value })}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
