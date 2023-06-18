import { createContext, useState, useEffect } from "react";
import { tasks as data } from "../data/tasks";

//Almacena los datos y nombre del contexto
export const TaskContext = createContext();

//El que va a contener todos (englobar)
export function TaskContextProvider(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(data);
  }, []);

  function createTask(task) {
    setTasks([
      ...tasks,
      {
        id: tasks.length,
        title: task.title.trim(),
        description: task.description.trim(),
      },
    ]);
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
