import TaskCard from "./TaskCard";
import {TaskContext} from '../../context/TaskContext'
import { useContext } from "react";

function TaskList() {

  const {tasks} = useContext(TaskContext)

  if (tasks.length === 0){ return <h1 className="text-4xl text-white font-bold text-center">No existen tareas aún</h1>}
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task}/>
      ))}
    </div>
  );
}

export default TaskList;
