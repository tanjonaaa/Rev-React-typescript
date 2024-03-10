import { nanoid } from "nanoid";
import { ChangeEvent, useState } from "react";
import { Task } from "../types/Task";

export const useTaskManager = () => {
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

    newTasks[index] = { ...newTasks[index], ...taskUpdate };

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
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    title,
    setTitle,
    searchKeyword,
    setSearchKeyword,
    tasks,
    setTasks,
    completeTask,
    updateTask,
    addTask,
    handleSearch,
    filteredTasks,
  };
};
