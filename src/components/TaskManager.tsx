import { nanoid } from "nanoid";
import { ChangeEvent, useState } from "react";
import "./TaskManager.css";

type Task = {
  id: string;
  title: string;
}

// TODO: create custom hook to manage task state
export const TaskManager = () => {
  const [title, setTitle] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // remove task from list
  const completeTask = (id: string): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>): void => {
    const newTasks: Task[] = tasks.slice();

    const index: number = tasks.findIndex((task) => task.id === id);

    newTasks[index] = {...newTasks[index], ...taskUpdate};

    setTasks(newTasks);
  };

  const addTask = (): void => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      // using nanoid to generate unique id
      id: nanoid(),
      title,
    };
    setTasks((prev) => prev.concat(newTask));
    setTitle("");
  };

  const handleSearch = (ev: ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks: Task[] = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

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
